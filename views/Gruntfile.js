module.exports = function (grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        ngconstant: {
            options: {
                space: '  ',
                wrap: '"use strict";\n\n {%= __ngModule %}',
                name: 'config'
            },
            development: {
                options: {
                    dest: 'scripts/config.js'
                },
                constants: {
                    env: {
                        name: 'development',
                        apiEndpoint: 'http://localhost:3000/'
                    }
                }
            },
            production: {
                options: {
                    dest: 'scripts/config.js'
                },
                constants: {
                    env: {
                        name: 'production',
                        apiEndpoint: 'http://kg.gg/'
                    }
                }
            }
        },

        concat: {
            js: {
                src: [
                    'scripts/config.js',
                    'app.js',
                    'controllers/*.js'
                ],
                dest: 'build/js/keg.js'
            },
            css: {
                src: [
                    'css/*.css'
                ],
                dest: 'build/css/keg.css'
            }
        },

        uglify: {
            js: {
                src: 'build/js/keg.js',
                dest: 'build/js/keg.min.js'
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'build/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/css',
                    ext: '.min.css'
                }]
            }
        },

        watch: {
            js: {
                files: ['app.js'],
                tasks: ['concat:js', 'uglify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['css/*.css'],
                tasks: ['concat:css', 'cssmin'],
                options: {
                    spawn: false
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-constant');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', [
        'ngconstant:development',
        'concat',
        'uglify',
        'cssmin',
        'watch'
    ]);

};