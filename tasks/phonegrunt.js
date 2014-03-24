/**
 * PhoneGrunt Grunt Plugin
 * A tool to automate development tasks for PhoneGap mobile applications.
 * https://github.com/realog32/phonegrunt
 *
 * Copyright (c) 2014 Ogom "realog32" Okafor
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Defines PhoneGrunt tasks
 * @param  {[type]} grunt Grunt instance
 * @return {void}
 */
module.exports = function(grunt) {

    /**
     * Lodash object
     * @type {Object}
     */
    var _ = require('lodash');

    /**
     * PhoneGrunt task helper object
     * @type {Object}
     */
    var helper = require('./lib/helper').init(grunt);

    /**
     * Custom targets defined for the PhoneGrunt task. It is populated by the hasTargets IIFE below.
     * @type {Array}
     */
    var targets = [];

    /**
     * Boolean indication of whether targets were defined for PhoneGrunt.
     * The module's target variable is defined here.
     * @see PhoneGrunt#targets
     * @type {Boolean}
     */
    var hasTargets = (function(){
        var taskConfig = grunt.config('phonegrunt');
        if(!taskConfig){return false;}
        targets = _.without(_.keys(taskConfig),'options','init','build');
        return _.isEmpty(targets) ? false : true;
    })();

    /**
     * A multi-task that triggers PhoneGrunt's init and build tasks.
     * @return {void}
     */
    grunt.registerMultiTask('phonegrunt', 'PhoneGrunt grunt plugin.', function() {

        var target = this.target;
        var initCfg = helper.getInitConfig(target, true);
        var buildCfg = helper.getBuildConfig(target, true);
        var options = helper.getOptions(target, true);
        var response = true;

        if(hasTargets) { // Custom targets were defined.
            if(-1 !== _.indexOf(['build','init'], target, true)) {
                grunt.log.writeln("Targets defined. Skipping global "+target+" task.");
                return true;
            }
            if('undefined' !== typeof initCfg && !_.isEmpty(initCfg)) {
                response = helper.initApplication(target, initCfg, options);
            }
            if('undefined' !== typeof buildCfg && !_.isEmpty(buildCfg)) {
                response = helper.buildApplication(target, buildCfg, options);
            }
        } else { // No targets were defined.
            if('init' === target && 'undefined' !== typeof initCfg && !_.isEmpty(initCfg)) {
                return helper.initApplication(target, initCfg, options);
            }
            if('build' === target && 'undefined' !== typeof buildCfg && !_.isEmpty(buildCfg)) {
                return helper.buildApplication(target, buildCfg, options);
            }
        }

        return true;
    });

};