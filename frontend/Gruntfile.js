'use strict';
var rewrite = require("connect-modrewrite");
module.exports = function (grunt) {
    grunt.initConfig({
        uncss: {
            dist: {
                options: {
                    stylesheets  : ['bower_components/bootstrap/dist/css/bootstrap.min.css', 'css/custom.css'],
                    report: 'min'
                },
                files: {
                    'build/tidy.css': ['index.html', 'views/*.html']
                }
            }
        },
        concat: {
            js: {
                src: ['bower_components/jquery/dist/jquery.min.js', 'bower_components/bootstrap/dist/js/bootstrap.min.js', 'bower_components/angular/angular.min.js', 'bower_components/angular-ui-router/release/angular-ui-router.min.js', 'scripts/app.js'],
                dest: 'build/built.js'
            },
            css: {
                src: ['build/tidy.css', 'css/custom.css'],
                dest: 'build/built.css'
            }
        },
        cssmin : {
            css:{
                src: ['build/tidy.css', 'css/custom'],
                dest: 'build/combined.min.css'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['scripts/**/*.js'],
                tasks: ['concat:js']
            },
            css: {
                files: ['css/**/*.css'],
                tasks: ['uncss','concat:css', 'cssmin']
            },
            views: {
                files: ['views/**/*.html', './index.html'],
                tasks: ['uncss','concat:css', 'cssmin']
            }
        },
        connect: {
            options: {
                middleware: function (connect, options, middlewares) {
                    var rules = [
                        "!\\.html|\\.js|\\.eot|.woff|.woff2|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html"
                    ];
                    middlewares.unshift(rewrite(rules));
                    return middlewares;
                }
            },
            server: {
                options: {
                    port: 9001,
                    base: './',
                    livereload: true
                }
            }
        },
        open: {
            all: {
                // Gets the port from the connect configuration
                path: 'http://localhost:<%= connect.server.options.port%>'
            }
        }
    });
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('server', ['open']);
    grunt.registerTask('default', ['concat', 'uncss', 'cssmin', 'connect:server', 'watch']);
};