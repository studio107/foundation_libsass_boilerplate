module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false,
                compress: false
            },
            build: {
                files: {
                    'dist/<%= pkg.version %>.app.js': [
                        'vendor/jquery/dist/jquery.min.js',
                        'vendor/modernizr/modernizr.js',
                        'vendor/jquery.cookie/jquery.cookie.js',
                        'vendor/fastclick/lib/fastclick.js',
                        'vendor/foundation/js/foundation.min.js'
                    ]
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    'dist/<%= pkg.version %>.screen.css': [
                        'css/app.css'
                    ]
                }
            }
        },

        sass: {
            options: {
                includePaths: [
                    'vendor/foundation/scss',
                    '/Library/Ruby/Gems/2.0.0/gems/compass-0.12.2/frameworks/compass/stylesheets',
                    'vendor/mindy-sass/mindy'
                ]
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'css/app.css': 'scss/app.scss'
                }
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },

            sass: {
                files: 'scss/**/*.scss',
                tasks: ['sass', 'cssmin']
            },

            js: {
                files: 'js/**/*.js',
                tasks: ['uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('build', ['sass', 'uglify', 'cssmin']);
    grunt.registerTask('default', ['build', 'watch', 'uglify', 'cssmin']);
};
