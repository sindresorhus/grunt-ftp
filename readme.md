# grunt-ftp [![Build Status](https://travis-ci.org/sindresorhus/grunt-ftp.svg?branch=master)](https://travis-ci.org/sindresorhus/grunt-ftp)

> Upload or Download files to / from an FTP-Server

Useful for uploading, deploying and downloading things.


## Install

```sh
$ npm install --save-dev grunt-ftp
```


## Upload Usage

```js
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

grunt.initConfig({
	ftpPut: {
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

grunt.registerTask('default', ['ftpPut']);
```

## Download Usage

```js
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

grunt.initConfig({
	ftpGet: {
		options: {
			host: 'website.com',
			user: 'johndoe',
			pass: '1234'
		},
		download: {
			files: {
				'public_html/file.txt': 'src/file.txt'
			}
		}
	}
});

grunt.registerTask('default', ['ftpGet']);
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
