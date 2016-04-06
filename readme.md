# grunt-ftp [![Build Status](https://travis-ci.org/sindresorhus/grunt-ftp.svg?branch=master)](https://travis-ci.org/sindresorhus/grunt-ftp)

> Upload files to or download from an FTP-server

Useful for uploading, deploying and downloading things.


## Install

```
$ npm install --save-dev grunt-ftp
```


## Usage

### Upload

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

### Download

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

*Required*<br>
Type: `string`

### port

Type: `number`<br>
Default: `21`

### user

Type: `string`<br>
Default: `'anonymous'`

### pass

Type: `string`<br>
Default: `'@anonymous'`


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
