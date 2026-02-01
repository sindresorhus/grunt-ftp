'use strict';
/* eslint-env mocha */
const assert = require('node:assert');
const grunt = require('grunt');

it('should upload files to an FTP-server', () => {
	assert(grunt.file.exists('ftp/fixture/fixture.txt'));
});

it('should create a new folder for retrieve files', () => {
	assert(grunt.file.isDir('fixtureGet'));
});

it('should download 2 files from an FTP-server', () => {
	assert(grunt.file.isFile('fixtureGet/fixture.txt'));
	assert(grunt.file.isFile('fixtureGet/fixture2.txt'));
});
