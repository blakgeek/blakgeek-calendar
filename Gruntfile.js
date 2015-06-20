module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [
		'clean',
		'ngtemplates',
		'concat',
		'sass'
	]);

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		ngtemplates: {
			dist: {
				options: {
					module: 'blakgeek.calendar',
					prefix: '/',
					htmlmin: {
						collapseWhitespace: true
					}
				},
				cwd: 'src',
				src: '**/*.html',
				dest: '.tmp/calendar.template.js'
			}
		},
		clean: {
			dist: ['.tmp', 'dist']
		},
		concat: {
			dist: {
				src: ['src/**/*.js', '.tmp/**/*.js'],
				dest: 'dist/calendar.js'
			}
		},
		sass: {
			options: {
				style: 'compressed',
				sourcemap: 'none'
			},
			dist: {
				expand: true,
				cwd: 'src/sass',
				src: ['**/*.scss'],
				dest: 'dist',
				ext: '.css'
			}
		}
		//},
		//watch: {
		//	sass: {
		//		files: 'src/sass/**/*.scss',
		//		tasks: 'sass',
		//		options: {
		//			livereload: true
		//		}
		//	},
		//	copy: {
		//		files: ['src/**/*', '!src/sass/**/*.scss'],
		//		tasks: 'copy',
		//		options: {
		//			livereload: true
		//		}
		//	}
		//},
		//sass: {
		//	options: {
		//		style: 'compressed'
		//	},
		//	files: {
		//		expand: true,
		//		cwd: 'src/sass',
		//		src: '**/*.scss',
		//		dest: 'private/css',
		//		ext: '.css'
		//	}
		//},
		//copy: {
		//	everything: {
		//		expand: true,
		//		cwd: 'src',
		//		src: ['**', '!js/**', '!sass/**'],
		//		dest: 'private'
		//	},
		//	development: {
		//		expand: true,
		//		cwd: 'src',
		//		src: ['js/**'],
		//		dest: 'private'
		//	}
		//},
		//useminPrepare: {
		//	html: 'src/*.html',
		//	options: {
		//		dest: 'private'
		//	}
		//},
		//usemin: {
		//	html: ['private/*.html']
		//},
		//bower_concat: {
		//	all: {
		//		dest: 'private/js/dependencies.js'
		//	}
		//},
		//uglify: {
		//	dependencies: {
		//		options: {
		//			mangle: true,
		//			compress: true
		//		},
		//		files: {
		//			"private/js/dependencies.js": 'private/js/dependencies.js'
		//		}
		//	}
		//}
	});

};



