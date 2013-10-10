module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		compass: {
			prod: {
				options: {
					sassDir: 'app/webroot/css/src',
					cssDir: 'app/webroot/css',
					environment: 'production'
				}
			},
			dev: {
				options: {
					sassDir: 'app/webroot/css/src',
					cssDir: 'webroot/css'
				}
			}
		},

		jam: {
			prod: {
				src: ['app/webroot/js/src/*.js'],
				dest: 'webroot/js/main.js'
			},
			dev: {
				src: ['app/webroot/js/src/*.js'],
				dest: 'app/webroot/js/main.js',
				options: {
					verbose: true,
					nominify: true,
					wrap: true
				}
			}
		},

		jshint: {
			files: ['Gruntfile.js', 'app/webroot/js/src/**/*.js']
		},

		watch: {
			css: {
				files: ['app/webroot/css/src/**/*.scss'],
				tasks: ['compass:dev']
			},
			js: {
				files: ['<%= jam.dev.src %>'],
				tasks: ['jshint', 'jam:dev']
			}
		}
	});

	// tasks from npm
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jam');

	// our tasks
	grunt.registerTask('default', ['compass:dev', 'jshint', 'jam:dev']);
	grunt.registerTask('prod', ['compass:prod', 'jshint', 'jam:prod']);
};
