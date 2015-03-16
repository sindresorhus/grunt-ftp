'use strict';
var assert = require('assert');
var grunt = require('grunt');

it('should upload files to an FTP-server', function () {
	assert(grunt.file.exists('ftp/fixture/fixture.txt'));
});

it('should create a new folder for retrieve files', function () {
	assert(grunt.file.isDir('fixtureGet'));
});

it('should download 2 files from an FTP-server', function () {
	assert(grunt.file.isFile('fixtureGet/fixture.txt'));
	assert(grunt.file.isFile('fixtureGet/fixture2.txt'))
});
