'use strict';
module.exports = function (grunt) {
	grunt.initConfig({
		ftp: {
			test: {
				options: {
					host: 'localhost',
					port: 3334,
					user: 'test',
					pass: 'test'
				},
				files: {
					'ftp': 'fixture/fixture.txt'
				}
			},
			test2: {
				options: {
					host: 'localhost',
					port: 3334,
					user: 'test',
					pass: 'test'
				},
				files: [{
					cwd: 'fixture/fixture2',
					src: ['*'],
					dest: 'ftp'
				},{
					'ftp': 'fixture/**/fixture3.txt',
				}]
			}
		},
		simplemocha: {
			test: {
				src: 'test.js'
			}
		},
		clean: {
			test: ['ftp']
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-simple-mocha');

	var mockServer;
	grunt.registerTask('pre', function () {
		var Server = require('ftp-test-server');

		mockServer = new Server();

		mockServer.init({
			user: 'test',
			pass: 'test'
		});

		mockServer.on('stdout', process.stdout.write.bind(process.stdout));
		mockServer.on('stderr', process.stderr.write.bind(process.stderr));

		setTimeout(this.async(), 500);
	});

	grunt.registerTask('post', function () {
		mockServer.stop();
	});

	grunt.registerTask('default', [
		'clean',
		'pre',
		'ftp',
		'simplemocha',
		'post',
		'clean'
	]);
};
