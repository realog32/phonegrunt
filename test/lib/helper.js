/**
 * PhoneGrunt Testing Helper
 * https://github.com/realog32/phonegrunt
 *
 * Copyright (c) 2014 Ogom "realog32" Okafor
 * Licensed under the MIT license.
 */

'use strict';

/**
 * PhoneGrunt Grunt Plugin Unit Test Helper Object
 * @param  {Object} grunt Grunt instance
 * @return {Object}
 */
exports.init = function(grunt) {

    var _ = require('lodash');
    var shelljs = require('shelljs');
    var path = require('path');

    /**
     * Helper API object
     * @type {Object}
     */
    var exports = {};

    /**
     * Runs grunt phonegrunt command to build test phonegap application in test targets; /tmp/multi_target and /tmp/single_target relative to Gruntfile.
     * @return void
     */
    exports.buildTestProjects = function() {
    };

    /**
     * Tests to see whether test fixtures have been created.
     * @return {Boolean} fixturesAreCopied Boolean indication of whether test fixtures have been copied by the grunt copy task.
     */
    exports.fixturesCopied = function() {
        // check for ../../tmp/multi_target
        // check for ../../tmp/multi_target/args.json
        // check for ../../tmp/multi_target/Gruntfile.js
        // check for ../../tmp/multi_target/node_modules/
        // check for ../../tmp/single_target
        // check for ../../tmp/single_target/args.json
        // check for ../../tmp/single_target/Gruntfile.js
        // check for ../../tmp/single_target/node_modules/
        return false;
    };

    return exports;
};