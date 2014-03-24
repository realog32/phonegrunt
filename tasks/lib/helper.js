/*
 * PhoneGrunt helper
 * https://github.com/realog32/phonegrunt
 *
 * Copyright (c) 2014 Ogom "realog32" Okafor
 * Licensed under the MIT license.
 */

'use strict';

exports.init = function(grunt) {

    var _ = require('lodash');
    var shelljs = require('shelljs');
    var path = require('path');

    /**
     * Holds gruntfile build configuration values for PhoneGrunt task(s)
     * @type {Object}
     */
    var _buildConfig = {};

    /**
     * Holds gruntfile init configuration values for PhoneGrunt task(s)
     * @type {Object}
     */
    var _initConfig = {};

    /**
     * Holds gruntfile options for HelloPhonegap task(s)
     * @type {Object}
     */
    var _options = {};

    /**
     * Helper API
     * @type {Object}
     */
    var exports = {};

    /**
     * Runs the PhoneGrunt build task.
     * @param {String} target The PhoneGrunt target being processed.
     * @param {Object} cfg Build configuration defined in Gruntfile.
     * @param {Object} opts PhoneGrunt options defined in Gruntfile.
     * @return void
     */
    exports.buildApplication = function(target, cfg, opts) {

        var defaultConfig = {
            local: {plugins: {add: [], remove: []}}
        };

        cfg = _.extend(defaultConfig, cfg);

        var cwd = shelljs.pwd();
        var installDir = path.resolve(cwd, opts.installDir);
        var cordovaBin = path.relative(installDir, opts.cordovaBin);
        var phonegapBin = path.relative(installDir, opts.phonegapBin);

        shelljs.cd(opts.installDir);

        this.plugins = function(env, plugincfg, opts) {

            var a;
            var pluginAlias;

            if(!_.isEmpty(plugincfg.add)) {
                for(a = 0; a < plugincfg.add.length; a++) {
                    pluginAlias = plugincfg.add[a];
                    grunt.log.writeln('Installing '+pluginAlias+' plugin.');
                    shelljs.exec(phonegapBin+' '+env+' plugin add org.apache.cordova.'+pluginAlias);
                }
            }

            if(!_.isEmpty(plugincfg.remove)) {
                for(a = 0; a < plugincfg.remove.length; a++) {
                    pluginAlias = plugincfg.remove[a];
                    grunt.log.writeln('Uninstalling '+pluginAlias+' plugin.');
                    shelljs.exec(phonegapBin+' '+env+' plugin remove org.apache.cordova.'+pluginAlias);
                }
            }

            grunt.log.subhead('Plugin updates completed for '+env+" build.\nCurrently installed plugins:");
            shelljs.exec(phonegapBin+' '+env+' plugin list');
        };

        for(var env in cfg) {
            var _tasks = cfg[env];
            for(var _task in _tasks) {
                if('function' === typeof this[_task]) {
                    this[_task].apply(this, [env, _tasks[_task], opts]);
                }
            }
        }

        shelljs.cd(cwd);

        grunt.log.writeln('Build tasks completed.'.green);
    };

    /**
     * Returns the build configuration defined in the Gruntfile for the specified target.
     * @param {String} target The target to return build configurations for.
     * @param {Boolean} extendGlobal Whether to extend target build configurations with any globally defined build configurations in phonegrunt.build.
     * @return {Object} build configurations if found, else empty object.
     */
    exports.getBuildConfig = function(target, extendGlobal) {

        if('string' !== typeof target) {target = '_globals_';}
        if('boolean' !== typeof extendGlobal) {extendGlobal = false;}

        if(!_.isEmpty(_buildConfig[target])) {
            return _buildConfig[target];
        }

        var cfg = {};
        var globalCfg = '_globals_' === target;
        var cfgTarget = globalCfg ? 'phonegrunt.build' : 'phonegrunt.'+target+'.build';

        if(true === extendGlobal && !globalCfg) {
            cfg = exports.getBuildConfig('_globals_', false);
        }

        cfg = _.extend(cfg, grunt.config(cfgTarget));

        if(_.isEmpty(cfg)) {
            grunt.log.writeln(('No '+(globalCfg ? 'global ' : '')+'build settings found in '+cfgTarget+'.').yellow);
            cfg = {};
        }

        if('undefined' !== typeof cfg.local) {

            if('undefined' !== typeof cfg.local.plugins) {

                if('undefined' !== typeof cfg.local.plugins.add && !_.isArray(cfg.local.plugins.add)) {
                    cfg.local.plugins.add = [cfg.local.plugins.add];
                }

                if('undefined' !== typeof cfg.local.plugins.remove && !_.isArray(cfg.local.plugins.remove)) {
                    cfg.local.plugins.remove = [cfg.local.plugins.remove];
                }
            }
        }

        _buildConfig[target] = cfg;

        return cfg;
    };

    /**
     * Retrieves initialization configuration for PhoneGrunt targets. It returns project defaults if no configurations were defined.
     * @param {String} target The PhoneGrunt target to return configuration values for. If not specified, the global phonegrunt.init config is returned.
     * @param {Boolean} extendGlobal Whether to extend target init configurations with any globally defined build configurations in phonegrunt.init.
     * @return {Object} initialization configurations if found, else empty object.
     */
    exports.getInitConfig = function(target, extendGlobal) {

        if('string' !== typeof target) {target = '_globals_';}
        if('boolean' !== typeof extendGlobal) {extendGlobal = false;}

        if(!_.isEmpty(_initConfig[target])) {
            return _initConfig[target];
        }

        var cfg = {};
        var globalCfg = '_globals_' === target;
        var cfgTarget = globalCfg ? 'phonegrunt.init' : 'phonegrunt.'+target+'.init';

        if(true === extendGlobal && !globalCfg) {
            cfg = exports.getInitConfig('_globals_', false);
        }

        cfg = _.extend(cfg, grunt.config(cfgTarget));

        if(_.isEmpty(cfg)) {
            grunt.log.writeln(('No '+(globalCfg ? 'global ' : '')+'init settings found in '+cfgTarget+'.').yellow);
            cfg = {};
        }

        if('undefined' === typeof cfg.name || !_.isString(cfg.name) || _.isEmpty(cfg.name)) {
            cfg.name = 'HelloPhonegap';
        }

        if('undefined' === typeof cfg.pkg || !_.isString(cfg.pkg) || _.isEmpty(cfg.pkg)) {
            cfg.pkg = 'com.example.hellophonegap';
        }

        if('undefined' !== typeof cfg.install_os && !_.isArray(cfg.install_os)) {
            cfg.install_os = [cfg.install_os];
        }

        if('undefined' !== typeof cfg.uninstall_os && !_.isArray(cfg.uninstall_os)) {
            cfg.uninstall_os = [cfg.uninstall_os];
        }

        _initConfig[target] = cfg;

        return cfg;
    };

    /**
     * Returns options for PhoneGrunt targets. It returns project defaults if no options were defined.
     * @param {String} target The PhoneGrunt target to return option values for. If not specified, global options are returned.
     * @param {Boolean} extendGlobal Whether to extend target options with any globally defined options in phonegrunt.options.
     * @return {Object}
     */
    exports.getOptions = function(target, extendGlobal) {

        if('string' !== typeof target) {target = '_globals_';}
        if('boolean' !== typeof extendGlobal) {extendGlobal = false;}

        if(!_.isEmpty(_options[target])) {
            return _options[target];
        }

        var opts = {};
        if(true === extendGlobal && '_globals_' !== target) {
            opts = exports.getOptions('_globals_', false);
        }

        var optTarget = '_globals_' === target ? 'phonegrunt.options' : 'phonegrunt.'+target+'.options';
        opts = _.extend(opts, grunt.config(optTarget));

        if(_.isEmpty(opts)) {
            grunt.log.writeln('No options found ('+optTarget+'). Using hard-coded defaults.'.red);
            opts = {
                'cordovaBin': './node_modules/.bin/cordova',
                'installDir': './',
                'phonegapBin': './node_modules/.bin/phonegap'
            };
        }

        if('undefined' === typeof opts.cordovaBin || !_.isString(opts.cordovaBin) || _.isEmpty(opts.cordovaBin)) {
            opts.cordovaBin = './node_modules/.bin/cordova';
        }

        if('undefined' === typeof opts.installDir || !_.isString(opts.installDir) || _.isEmpty(opts.installDir)) {
            opts.installDir = './';
        }

        if('undefined' === typeof opts.phonegapBin || !_.isString(opts.phonegapBin) || _.isEmpty(opts.phonegapBin)) {
            opts.phonegapBin = './node_modules/.bin/phonegap';
        }

        if(opts.cordovaBin) {opts.cordovaBin = path.normalize(opts.cordovaBin);}
        if(opts.phonegapBin) {opts.phonegapBin = path.normalize(opts.phonegapBin);}
        if(opts.installDir) {opts.installDir = path.normalize(opts.installDir);}
        _options[target] = opts;
        return opts;
    };

    /**
     * Runs the PhoneGrunt init task.
     * @param {String} target The PhoneGrunt target being processed.
     * @param {Object} cfg Initialization configuration defined in Gruntfile.
     * @param {Object} opts PhoneGrunt options defined in Gruntfile.
     * @return void
     */
    exports.initApplication = function(target, cfg, opts) {

        this.phonegapCreate(cfg, opts);

        var cwd = shelljs.pwd();
        var installDir = path.resolve(cwd, opts.installDir);
        var cordovaBin = path.relative(installDir, opts.cordovaBin);
        var phonegapBin = path.relative(installDir, opts.phonegapBin);

        shelljs.cd(opts.installDir);

        var a = 0;
        var cmd = '';

        if(cfg.uninstall_os.length) {

            grunt.log.subhead('Removing mobile operating system support...'.green);

            for(a = 0; a < cfg.uninstall_os.length; a++) {
                cmd = cordovaBin+' platform remove '+cfg.uninstall_os[a];
                grunt.log.writeln("\nRemoving: ".yellow+cfg.uninstall_os[a]);
                grunt.verbose.writeln('Executing: '+cmd);
                shelljs.exec(cmd, {silent: false});
            }
        }

        if(cfg.install_os.length) {

            grunt.log.subhead('Adding mobile operating system support...'.green);

            for(a = 0; a < cfg.install_os.length; a++) {
                cmd = cordovaBin+' platform add '+cfg.install_os[a];
                grunt.log.writeln(("\nAdding: "+cfg.install_os[a]).yellow);
                grunt.verbose.writeln('Executing: '+cmd);
                shelljs.exec(cmd, {silent: false});
            }

            grunt.log.subhead('Building application...'.green);

            for(a = 0; a < cfg.install_os.length; a++) {
                cmd = phonegapBin+' local build '+cfg.install_os[a];
                grunt.log.writeln("\nBuilding: ".yellow+cfg.install_os[a]);
                grunt.verbose.writeln('Executing: '+cmd);
                shelljs.exec(cmd, {silent: false});
            }
        }

        shelljs.cd(cwd);

        grunt.log.writeln("\nInit Task (add, remove, and or build operating systems) Completed.".green);
    };

    /**
     * Creates the PhoneGap project.
     * @param {Object} cfg Initialization configuration defined in Gruntfile.
     * @param {Object} opts PhoneGrunt options defined in Gruntfile.
     * @return void
     */
    exports.phonegapCreate = function(cfg, opts) {
        var cmd = opts.phonegapBin+' create --d '+opts.installDir+' --id '+cfg.pkg+' --name '+cfg.name;
        grunt.verbose.subhead('Executing: '+cmd);
        shelljs.exec(cmd, {silent: false});
    };

    return exports;
};