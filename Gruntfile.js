'use strict';
/*

this is a home-cooked Gruntfile, but has taken large snippets from the default Gruntfile created by yeoman when creating an angular app (via 'yo angular')

*/

module.exports = function (grunt) {

	// load grunt tasks automaticalll
	require('load-grunt-tasks')(grunt);

	// time how long tasks take to run
	require('time-grunt')(grunt);

	var appConfig = {
		app: require('./bower.json').appPath || 'app',
		dist: 'dist'
	};
	// define tasks
	grunt.initConfig({
		// settings
		app: appConfig,

		// watch files for changes and run tasks based on these changes
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			js: {
				files: ['<%= app.app %>/scripts/{,*/}*.js'],
				tasks: ['newer:jshint:all'],
				options: {
					livereload: '<%= connect.options.livereload %>'
				}
			},
			styles: {
				files: ['<%= app.app %>/styles/{,*/}*.css'],
				tasks: ['newer:copy:styles', 'autoprefixer']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= app.app %>/{,*/}*.html',
					'.tmp/styles/{,*/}*.css',
					'<%= app.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg,PNG}'
				]
			}
		},

		// grunt server settings
		connect: {
			options: {
				port: 8000,
				hostname: 'localhost',
				livereload: 35729
			},
			livereload: {
				options: {
					open: true,
					middleware: function (connect) {
						return [
							connect.static('.tmp'),
							connect().use(
								'/bower_components',
								connect.static('./bower_components')
							),
							connect.static(appConfig.app)
						];
					}
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%= app.dist %>'
				}
			}
		},

		// empties dist/tmp folders to build/serve app
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= app.dist %>/{,*/}*'
					]
				}]
			},
			server: '.tmp'
		},

		// add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles'
				}]
			}
		},

		// inject bower components into the app
		wiredep: {
			app: {
				src: ['<%= app.app %>/index.html'],
				ignorePath: /\.\.\//
			}
		},

		// rename files for browser caching purposes
		filerev: {
			dist: {
				src: [
					'<%= app.dist %>/scripts/{,*/}*.js',
					'<%= app.dist %>/styles/{,*/}*.css',
					'<%= app.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg,PNG}',
					'<%= app.dist %>/styles/fonts'
				]
			}
		},

		// copies files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= app.app %>',
					dest: '<%= app.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'*.html',
						'views/{,*/}*.html',
						'images/{,*/}*.{webp}',
						'fonts/*',
						'data/*.json'
					]
				}, {
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= app.dist %>/images',
					src: ['generated/*']
				}]
			},
			styles: {
				expand: true,
				cwd: '<%= yeoman.app %>/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			}
		},

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			server: [
				'copy:styles'
			],
			test: [
				'copy:styles'
			],
			dist: [
				'copy:styles',
				'imagemin',
				'svgmin'
			]
		}
	});

	grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'wiredep',
			'connect:livereload',
			'watch'
		]);
	});
}
