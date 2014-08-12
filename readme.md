# grunt-ftp [![Build Status](https://travis-ci.org/sindresorhus/grunt-ftp.svg?branch=master)](https://travis-ci.org/sindresorhus/grunt-ftp)

> Upload files to an FTP-server

Useful for uploading and deploying things.


## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```bash
$ npm install --save-dev grunt-ftp
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ftp');
```

*Tip: the [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) module makes it easier to load multiple grunt tasks.*


[grunt]: http://gruntjs.com
[Getting Started]: http://gruntjs.com/getting-started


### Example

```js
grunt.initConfig({
	ftp: {											// Task
		options: {									// Options
			host: 'website.com',
			user: 'johndoe',
			pass: '1234',
			conf: './website-ftp.json'
		},
		upload: {									// Target
			files: {								// Dictionary of files
				'public_html': 'src/*'				// remote destination : source
			}
		}
	}
});

grunt.loadNpmTasks('grunt-ftp');
grunt.registerTask('default', ['ftp']);
```


### Options

#### conf

Type: `String`

A path to a JSON configuration file, containing the required properties below.

#### host

*Required*  
Type: `String`

#### port

Type: `Number`  
Default: `21`

#### user

Type: `String`  
Default: `'anonymous'`

#### pass

Type: `String`  
Default: `'@anonymous'`


## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)
