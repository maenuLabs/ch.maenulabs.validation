module.exports = function(grunt) {
	grunt.initConfig({
		meta: {
			package: grunt.file.readJSON('package.json'),
			src: {
				main: 'src/main',
				test: 'src/test',
			},
			lib: {
				main: 'lib/main',
				test: 'lib/test',
			},
			bin: {
				coverage: 'bin/coverage',
				i18n: 'bin/i18n',
				plato: 'bin/plato'
			},
			doc: 'doc',
			banner: '/**\n'
					+ ' * <%= meta.package.name %> v<%= meta.package.version %>\n'
					+ ' * built on ' + '<%= grunt.template.today("dd.mm.yyyy") %>\n'
					+ ' * Copyright <%= grunt.template.today("yyyy") %> <%= meta.package.author.name %>\n'
					+ ' * licenced under MIT, see LICENSE.txt\n'
					+ ' */\n'
		},
		clean: {
			bin: 'bin',
			doc: 'doc'
		},
		watch: {
			test: {
				files: ['<%= meta.src.main %>/js/**/*.js', '<%= meta.src.test %>/js/**/*.js'],
				tasks: ['test:coverage']
			}
		},
		jasmine: {
			normal: {
				src: [
					'<%= meta.src.main %>/js/**/initialize.js',
					'<%= meta.src.main %>/js/**/Validation.js',
					'<%= meta.src.main %>/js/**/PropertiesCheck.js',
					'<%= meta.src.main %>/js/**/ObjectCheck.js',
					'<%= meta.src.main %>/js/**/ExistenceCheck.js',
					'<%= meta.src.main %>/js/**/AtLeastCheck.js',
					'<%= meta.src.main %>/js/**/AtMostCheck.js',
					'<%= meta.src.main %>/js/**/GreaterThanCheck.js',
					'<%= meta.src.main %>/js/**/LessThanCheck.js',
					'<%= meta.src.main %>/js/**/StringLengthRangeCheck.js'
				]
			},
			coverage: {
				src: [
					'<%= meta.src.main %>/js/**/initialize.js',
					'<%= meta.src.main %>/js/**/Validation.js',
					'<%= meta.src.main %>/js/**/PropertiesCheck.js',
					'<%= meta.src.main %>/js/**/ObjectCheck.js',
					'<%= meta.src.main %>/js/**/ExistenceCheck.js',
					'<%= meta.src.main %>/js/**/AtLeastCheck.js',
					'<%= meta.src.main %>/js/**/AtMostCheck.js',
					'<%= meta.src.main %>/js/**/GreaterThanCheck.js',
					'<%= meta.src.main %>/js/**/LessThanCheck.js',
					'<%= meta.src.main %>/js/**/StringLengthRangeCheck.js'
				],
				options: {
					template: require('grunt-template-jasmine-istanbul'),
					templateOptions: {
						coverage: '<%= meta.bin.coverage %>/coverage.json',
						report: [{
							type: 'html',
							options: {
								dir: '<%= meta.bin.coverage %>'
							}
						}, {
							type: 'text-summary'
						}]
					}
				}
			},
			options: {
				specs: '<%= meta.src.test %>/js/**/*.js',
				vendor: [
					'node_modules/ch.maenulabs.type/ch.maenulabs.type.js'
				]
			}
		},
		concat: {
			validation: {
				src: [
					'<%= meta.src.main %>/js/**/initialize.js',
					'<%= meta.src.main %>/js/**/Validation.js',
					'<%= meta.src.main %>/js/**/PropertiesCheck.js',
					'<%= meta.src.main %>/js/**/ObjectCheck.js',
					'<%= meta.src.main %>/js/**/ExistenceCheck.js',
					'<%= meta.src.main %>/js/**/AtLeastCheck.js',
					'<%= meta.src.main %>/js/**/AtMostCheck.js',
					'<%= meta.src.main %>/js/**/GreaterThanCheck.js',
					'<%= meta.src.main %>/js/**/LessThanCheck.js',
					'<%= meta.src.main %>/js/**/StringLengthRangeCheck.js'
				],
				dest: '<%= meta.package.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= meta.banner %>'
			},
			validation: {
				files: {
					'<%= meta.package.name %>.min.js': '<%= meta.package.name %>.js'
				}
			},
			i18n: {
				files: {
					'<%= meta.package.name %>-i18n-en.min.js': '<%= meta.package.name %>-i18n-en.js'
				}
			}
		},
		yuidoc: {
			validation: {
				name: '<%= meta.package.name %>',
				description: '<%= meta.package.description %>',
				version: '<%= meta.package.version %>',
				options: {
					paths: '<%= meta.src.main %>/js',
					outdir: '<%= meta.doc %>'
				}
			}
		},
		exec: {
			'messageformat-en': {
				cmd: 'node_modules/messageformat/bin/messageformat.js --locale en <%= meta.src.main %>/i18n/en <%= meta.package.name %>-i18n-en.js'
			}
		},
		jshint: {
			main: '<%= meta.src.main %>/js/**/*.js',
			test: '<%= meta.src.test %>/js/**/*.js',
			options: {
				// enforce
				bitwise: true,
				camelcase: true,
				curly: true,
				eqeqeq: false,
				forin: true,
				immed: true,
				indent: 4,
				latedef: true,
				newcap: true,
				noarg: true,
				noempty: true,
				nonew: true,
				plusplus: true,
				quotmark: 'single',
				undef: true,
				unused: true,
				strict: false, // i don't get it
				trailing: true,
				maxparams: 5,
				maxdepth: 3,
				maxstatements: 42,
				maxcomplexity: 5,
				maxlen: 80,
				// relax
				eqnull: true,
				laxbreak: true, // break on + etc.
				sub: true,
				// environments
				browser: false,
				globals: {
					
				}
			}
		},
		plato: {
			options : {
				complexity : {
					logicalor : true,
					switchcase : true,
					forin : true,
					trycatch : true,
					jshint: '<%= jshint.options %>'
				}
			},
			src: {
				files: {
					'<%= meta.bin.plato %>/src': '<%= meta.src.main %>/js/**/*.js',
				}
			},
			test: {
				files: {
					'<%= meta.bin.plato %>/test': '<%= meta.src.test %>/js/**/*.js',
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-plato');

	grunt.registerTask('test-normal', 'jasmine:normal');
	grunt.registerTask('test-coverage', 'jasmine:coverage');
	
	grunt.registerTask('build-check', ['plato:src', 'plato:test', 'jshint:main', 'jshint:test']);
	grunt.registerTask('build-i18n', ['exec:messageformat-en', 'uglify:i18n']);
	grunt.registerTask('build-documentation', 'yuidoc:validation');
	grunt.registerTask('build-module', ['concat:validation', 'uglify:validation']);
	
	grunt.registerTask('build', ['clean:bin', 'clean:doc', 'build-check', 'build-documentation', 'build-i18n', 'build-module']);
};