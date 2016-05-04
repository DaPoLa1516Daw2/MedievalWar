'use strict';

module.exports = (grunt) => {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            script: {
                src: ['resources/scripts/**/*.js'],
                dest: 'public/scripts/main.js'
            }
        },

        less: {
            dev: {
                options: {
                    cleancss: false
                },
                files: {
                    'public/styles/main.css': 'resources/styles/main.less'
                }
            },
            build: {
                options: {
                    cleancss: true
                },
                files: {
                    'public/styles/main.min.css': 'resources/styles/main.less'
                }
            }
        },

        watch: {
            options: {
                livereload: 4321
            },
            script: {
                files: ['resources/scripts/**/*.js'],
                tasks: ['concat:script']
            },
            style: {
                files: ['resources/styles/**/*.less'],
                tasks: ['less:dev']
            },
            partials: {
                files: ['public/partials/**/*.html']
            }
        },

        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    watch: ['server.js', 'api/**/*.js', 'config/**/*.js'],
                    delay: 300
                }
            }
        },

        concurrent: {
            dev: ['nodemon:dev', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('dev', ['concat:script', 'less:dev', 'concurrent']);
    grunt.registerTask('build', ['concat:script', 'less:build']);
    grunt.registerTask('default', ['build']);

};