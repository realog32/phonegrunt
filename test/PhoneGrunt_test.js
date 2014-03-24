/*
 * PhoneGrunt Nodeunit Tests
 * https://github.com/realog32/phonegrunt
 *
 * Copyright (c) 2014 Ogom "realog32" Okafor
 * Licensed under the MIT license.
 */

'use strict';

var grunt = require('grunt');
var helper = require('./lib/helper').init(grunt);
var path = require('path');
var phonegruntHelper = require('../tasks/lib/helper').init(grunt);
var shelljs = require('shelljs');

var fixturesCreated = helper.fixturesCopied();

/*
    ======== A Handy Little Nodeunit Reference ========
    https://github.com/caolan/nodeunit

    Test methods:
        test.expect(numAssertions)
        test.done()
    Test assertions:
        test.ok(value, [message])
        test.equal(actual, expected, [message])
        test.notEqual(actual, expected, [message])
        test.deepEqual(actual, expected, [message])
        test.notDeepEqual(actual, expected, [message])
        test.strictEqual(actual, expected, [message])
        test.notStrictEqual(actual, expected, [message])
        test.throws(block, [error], [message])
        test.doesNotThrow(block, [error], [message])
        test.ifError(value)
*/

exports.PhoneGrunt = {

    setUp: function(done) {
        // setup here if necessary
        // copy node_modules dir to tmp/test_target directories
        done();
    },

    helper_buildApplication: function(test) {
    },

    helper_getBuildConfig: function(test) {
    },

    helper_getInitConfig: function(test) {
    },

    helper_getOptions: function(test) {
    },

    helper_initApplication: function(test) {
    },
    
    helper_phonegapCreate: function(test) {
    }
};