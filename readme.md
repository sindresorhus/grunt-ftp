# grunt-ftp [![Build Status](https://travis-ci.org/sindresorhus/grunt-ftp.svg?branch=master)](https://travis-ci.org/sindresorhus/grunt-ftp)

> Upload files to an FTP-server

Useful for uploading and deploying things.


## Install

```sh
$ npm install --save-dev grunt-shell
```


## Usage

```js
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

grunt.initConfig({
	ftp: {
		options: {
			host: 'website.com',
			user: 'johndoe',
			pass: '1234'
		},
		upload: {
			files: {
				'public_html': 'src/*'
			}
		}
	}
});

grunt.registerTask('default', ['ftp']);
```


## Options

### host

*Required*  
Type: `string`

### port

Type: `number`  
Default: `21`

### user

Type: `string`  
Default: `'anonymous'`

### pass

Type: `string`  
Default: `'@anonymous'`


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
