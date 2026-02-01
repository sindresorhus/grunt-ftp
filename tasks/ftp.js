'use strict';
const {pipeline} = require('node:stream/promises');
const fs = require('node:fs');
const path = require('node:path');
const eachAsync = require('each-async');
const chalk = require('chalk');
// Not using jsftp v2 because `put` hangs.
let JSFtp = require('jsftp');

JSFtp = require('jsftp-mkdirp')(JSFtp);

module.exports = function (grunt) {
	grunt.registerMultiTask('ftpPut', 'Upload files to an FTP-server', function () {
		const done = this.async();
		const options = this.options();
		let fileCount = 0;

		if (options.host === undefined) {
			throw new Error('`host` required');
		}

		eachAsync(this.files, (element, i, next) => {
			// Have to create a new connection for each file otherwise they conflict
			const ftp = new JSFtp(options);
			const finalRemotePath = path.posix.join('/', element.dest, element.src[0]);

			ftp.mkdirp(path.posix.dirname(finalRemotePath), error => {
				if (error) {
					next(error);
					return;
				}

				const buffer = grunt.file.read(element.src[0], {encoding: null});

				ftp.put(buffer, finalRemotePath, error => {
					if (error) {
						next(error);
						return;
					}

					fileCount++;
					ftp.raw('quit');
					next();
				});
			});
		}, error => {
			if (error) {
				grunt.warn(error);
				done();
				return;
			}

			if (fileCount > 0) {
				grunt.log.writeln(chalk.green(fileCount, fileCount === 1 ? 'file' : 'files', 'uploaded successfully'));
			} else {
				grunt.log.writeln(chalk.yellow('No files uploaded'));
			}

			done();
		});
	});

	grunt.registerMultiTask('ftpGet', 'Download files from an FTP-server', function () {
		const done = this.async();
		const options = this.options();
		let fileCount = 0;

		if (options.host === undefined) {
			throw new Error('`host` required');
		}

		eachAsync(this.files, (element, i, next) => {
			// Have to create a new connection for each file otherwise they conflict
			const ftp = new JSFtp(options);

			grunt.file.mkdir(path.dirname(element.dest));

			let finalLocalPath = element.dest;
			if (grunt.file.isDir(element.dest)) {
				// If dest is a directory we have to create a file with the source filename
				finalLocalPath = path.join(element.dest, path.basename(element.src[0]));
			}

			// Using stream-based `get` because the file-based variant hangs on modern Node.js.
			ftp.get(element.src[0], (error, socket) => {
				if (error) {
					next(error);
					return;
				}

				const writeStream = fs.createWriteStream(finalLocalPath);
				socket.resume();
				pipeline(socket, writeStream).then(() => {
					fileCount++;
					ftp.raw('quit');
					next();
				}, next);
			});
		}, error => {
			if (error) {
				grunt.warn(error);
				done();
				return;
			}

			if (fileCount > 0) {
				grunt.log.writeln(chalk.green(fileCount, fileCount === 1 ? 'file' : 'files', 'downloaded successfully'));
			} else {
				grunt.log.writeln(chalk.yellow('No files downloaded'));
			}

			done();
		});
	});
};
