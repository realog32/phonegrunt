/*
 * PhoneGrunt Development Tasks
 * https://github.com/realog32/phonegrunt
 *
 * Copyright (c) 2014 Ogom "realog32" Okafor
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>',
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            options: {force: true},
            tests: ['tmp/**/*'],
        },

        // Copy files need for testing to tmp directory
        copy: {
            single_target: {
                files: [
                    {expand: true, cwd: 'node_modules/', src: ['grunt/**/*','lodash/**/*','shelljs/**/*'], dest: 'tmp/single_target/node_modules'},
                    {expand: true, src: ['tasks/**/*'], dest: 'tmp/single_target/', flatten: false},
                    {expand: true, src: ['test/fixtures/single_target/**/*'], dest: 'tmp/single_target', flatten: true}
                ]
            },
            multi_target: {
                files: [
                    {expand: true, cwd: 'node_modules/', src: ['grunt/**/*','lodash/**/*','shelljs/**/*'], dest: 'tmp/multi_target/node_modules'},
                    {expand: true, src: ['tasks/**/*'], dest: 'tmp/multi_target/', flatten: false},
                    {expand: true, src: ['test/fixtures/multi_target/**/*'], dest: 'tmp/multi_target', flatten: true}
                ]
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js'],
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, 
    // Copy over fixtures to tmp/multi_target and tmp/single_target directories,
    // then run the tests.
    grunt.registerTask('test', ['clean', 'copy', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);
};
