'use strict';
var assert = require('assert');
var grunt = require('grunt');

it('should upload files to an FTP-server', function () {
	assert(grunt.file.exists('ftp/fixture/fixture.txt'));
});

it('should upload file to the right path starting from cwd directory', function () {
    assert(grunt.file.exists('ftp/fixture2.txt'));
});
