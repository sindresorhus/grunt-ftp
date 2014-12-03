'use strict';
var path = require('path');
var eachAsync = require('each-async');
var chalk = require('chalk');
var JSFtp = require('jsftp');


JSFtp = require('jsftp-mkdirp')(JSFtp);

module.exports = function (grunt) {
	grunt.registerMultiTask('ftp', 'Upload files to an FTP-server', function () {
		var done = this.async();
		var options = this.options();
		var fileCount = 0;

		if (options.host === undefined) {
			throw new Error('`host` required');
		}

		this.files.forEach(function(el) {

			grunt.verbose.writeln( chalk.yellow(el.cwd), ' -> ', chalk.yellow(el.dest),  chalk.green(el.src.length) );

			eachAsync(el.src, function (filename, i, next) {
				// have to create a new connection for each file otherwise they conflict

				var fullSrcPath = path.join( el.cwd, filename),
					finalRemotePath = path.join('/', el.dest, filename);

				if( grunt.file.isFile(fullSrcPath) ){

					var ftp = new JSFtp(options);

					grunt.verbose.writeln( chalk.grey(fullSrcPath), ' -> ', chalk.cyan(finalRemotePath) );

					ftp.mkdirp(path.dirname(finalRemotePath), function (err) {
						if (err) {
							next(err);
							return;
						}

						var buffer = grunt.file.read(fullSrcPath, {encoding: null});

						ftp.put(buffer, finalRemotePath, function (err) {
							if (err) {
								next(err);
								return;
							}

							fileCount++;
							ftp.raw.quit();
							next();
						});
					});
				}else{
					grunt.verbose.writeln( chalk.grey(fullSrcPath), ' skipped.', chalk.yellow('Not a file') );
					next();
				}

			}, function (err) {
				if (err) {
					grunt.warn(err);
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
	});
};
