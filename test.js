'use strict';
var assert = require('assert');
var grunt = require('grunt');

it('should upload files to an FTP-server', function () {
	assert(grunt.file.exists('ftp/fixture/fixture.txt'));
});
