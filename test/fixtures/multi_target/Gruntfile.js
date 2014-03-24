/*
 * PhoneGrunt Multi-target Build
 * https://github.com/realog32/phonegrunt
 *
 * Copyright (c) 2014 Ogom "realog32" Okafor
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // PhoneGrunt task with global options and no target defined
        phonegrunt: {

            options: {
                cordovaBin: './node_modules/.bin/cordova',
                installDir: './',
                phonegapBin: './node_modules/.bin/phonegap'
            },

            init: {
                name: 'test',
                pkg: 'com.example.test',
                install_os: [],
                uninstall_os: []
            },

            build: {
                local: {
                    plugins: {
                        add: [],
                        remove: []
                    }
                }
            },

            hellophonegap: {

                options: {
                    cordovaBin: '../../node_modules/.bin/cordova',
                    installDir: './hellophonegap',
                    phonegapBin: '../../node_modules/.bin/phonegap'
                },

                init: {
                    name: 'HelloPhonegap',
                    pkg: 'com.example.hellophonegap',
                    install_os: ["android"],
                    uninstall_os: []
                },

                build: {
                    local: {
                        plugins: {
                            add: ["device","battery-status","camera","contacts"],
                            remove: []
                        }
                    }
                }
            },

            goodbyephonegap: {

                options: {
                    cordovaBin: '../../node_modules/.bin/cordova',
                    installDir: './goodbyephonegap',
                    phonegapBin: '../../node_modules/.bin/phonegap'
                },

                init: {
                    name: 'GoodbyePhonegap',
                    pkg: 'com.example.goodbyephonegap',
                    install_os: ["android"],
                    uninstall_os: []
                },

                build: {
                    local: {
                        plugins: {
                            add: ["device","battery-status","camera","contacts"],
                            remove: []
                        }
                    }
                }
            }
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['phonegrunt']);

};