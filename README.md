# PhoneGrunt

> A grunt plugin for automating PhoneGap mobile application development tasks.

## Getting Started
This plugin requires Grunt `~0.4.2` and supports PhoneGap API `~3.3.0-0.19.6`.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
$ npm install phonegrunt --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('phonegrunt');
```

## The "PhoneGrunt" task

### Overview
In your project's Gruntfile, add a section named `phonegrunt` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({

    phonegrunt: {

        /* Global task options */
        options: {
            // Mobile app install path, PhoneGap, and Cordova binary paths go here.
        },

        /* Global initialization configuration. */
        init: {
            // Mobile application title, package name, and target mobile operating systems are defined here.
        },

        /* Global build configuration. */
        build: {
            local: {
                // Local environment build configuration like plugins to install/uninstall go here.
            }
        },

        /* Targets for multiple application development. (Optional.) If unspecified, application is installed in current directory. */
        your_first_target: {
            /* target-specific options override global options. */
            options: {},
            /* target-specific initialization configuration. */
            init: {},
            /* target-specific build configurations. */
            build: {}
        },

        /* Multiple targets can be defined */
        another_target: {
        }
    },
});
```

### Task Options

#### options.cordovaBin
Type: `String`
Default value: `'./node_modules/.bin/cordova'`

Path to the Apache cordova binary.

#### options.installDir
Type: `String`
Default value: `'./'`

Mobile application source installation directory. Caution: Multiple targets will overwrite the same directory unless target-specific options.installDir is defined.

#### options.phonegapBin
Type: `String`
Default value: `'./node_modules/.bin/phonegap'`

Path to the Adobe PhoneGap binary.

### Initialization Configuration

#### init.name
Type: `String`
Default value: `'HelloPhonegap'`

The PhoneGap mobile application's name.

#### init.pkg
Type: `String`
Default value: `'com.example.hellophonegap'`

PhoneGap application package namespace.

#### init.install_os
Type: `Array`
Default value: `[]`

Mobile operating systems to install support for. Eg: `["android","ios"]`
See PhoneGap's [platform guides][platform_guide] documentation for additional information on supported operating systems and required development environment setup.

#### init.uninstall_os
Type: `Array`
Default value: `[]`

Mobile operating systems to uninstall support for. Eg: `["firefoxos"]`

### Build Configuration

Currently, only local workflow task options are supported. Remote workflow is planned for a future release.

#### build.local.plugins
Type: `Object`

Configuration object for specifying whether cordova plugins should be added or removed from target build environment.

#### build.local.plugins.add
Type: `Array`
Default value: `[]`

Array of cordova plugins to add to the build. Eg: `["device","battery-status","camera"]`

#### build.local.plugins.remove
Type: `Array`
Default value: `[]`

Array of cordova plugins to remove from the build. Eg: `["geolocation"]`

### Usage Examples

#### Single-target build installed in same directory as Gruntfile.

In this example, `android` and `ios` support will be enabled for the target PhoneGap application, which will be created in the same directory as the Gruntfile. The native application class file will be namespaced to `com.example.hellophonegap`. Eg. The android application entry point will be located at `./platforms/android/src/com/example/hellophonegap/HelloPhonegap.java` (relative to the gruntfile). The `build` task will add the `device`, `battery-status`, and `camera` plugins while removing the `geolocation` plugin from the build.

```js
grunt.initConfig({

    phonegrunt: {
        options: {
            cordovaBin: './node_modules/.bin/cordova',
            installDir: './',
            phonegapBin: './node_modules/.bin/phonegap'
        },
        init: {
            name: 'HelloPhonegap',
            pkg: 'com.example.hellophonegap',
            install_os: ["android", "ios"],
            uninstall_os: []
        },
        build: {
            local: {
                plugins: {
                    add: ["device","battery-status","camera"],
                    remove: ["geolocation"]
                }
            }
        }
    }
});
```

#### Multi-target build created in separate directories.

In this example, `ios` and `android` support will be enabled for the `HelloPhonegap` and `GoodbyePhonegap` targets respectively. IOS and Android mobile applications will be created in the `./hellophonegap` and `./goodbyephonegap` directories relative to the Gruntfile. No plugins will be installed for the GoodbyePhonegap target.

```js
grunt.initConfig({

    phonegrunt: {
        options: {
            cordovaBin: './node_modules/.bin/cordova',
            phonegapBin: './node_modules/.bin/phonegap'
        },
        HelloPhonegap: {
            options: {
                installDir: './hellophonegap',
            },
            init: {
                name: 'HelloPhonegap',
                pkg: 'com.example.hellophonegap',
                install_os: ["ios"],
                uninstall_os: []
            },
            build: {
                local: {
                    plugins: {
                        add: ["device","battery-status","camera"],
                        remove: ["geolocation"]
                    }
                }
            }
        },
        GoodbyePhonegap: {
            options: {
                installDir: './goodbyephonegap',
            },
            init: {
                name: 'GoodbyePhonegap',
                pkg: 'com.example.goodbyephonegap',
                install_os: ["android"],
                uninstall_os: []
            }
        }
    }
});
```

To simply update plugin requirements for your application without performing init tasks, using the example above one can run:

```shell
$ grunt phonegrunt:HelloPhonegap:build
```

## Support

Please report any issues [here][issues] and feel absolutely welcome to fork and submit pull requests.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_


[issues]: https://github.com/realog32/phonegrunt/issues
[platform_guide]: http://docs.phonegap.com/en/3.4.0/guide_platforms_index.md.html#Platform%20Guides