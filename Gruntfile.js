module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        paths: {
            src: {
                jsVendor: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/angular/angular.js',
                    'bower_components/select2/select2.js',
                    'bower_components/angular-resource/angular-resource.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'bower_components/ngLocale/angular-locale_de-ch.js',
                    'bower_components/angular-bootstrap/ui-bootstrap.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                    'bower_components/toastr/toastr.js',
                    'bower_components/textAngular/src/textAngularSetup.js',
                    'bower_components/textAngular/src/textAngular.js',
                    'bower_components/textAngular/src/textAngular-sanitize.js',
                    'bower_components/angular-select2/dist/angular-select2.min.js',
                    'bower_components/rangy/rangy-core.js',
                    'bower_components/rangy/rangy-selectionsaverestore.js'
                ],
                jsAchilles: [
                    'config/config.js',
                    'js/**/*.js'
                ],
                jsMin: [
                    '<%= paths.dest.jsVendorMin %>',
                    '<%= paths.dest.jsAchillesMin %>',
                    //'bower_components/textAngular/dist/textAngular-rangy.min.js',
                    //'bower_components/textAngular/dist/textAngular-sanitize.min.js',
                    //'bower_components/textAngular/dist/textAngular.min.js',
                ]
            },
            dest: {
                jsAchillesMin: 'build/achilles.min.js',
                jsVendorMin: 'build/vendor.min.js',
                jsApp: 'build/app.min.js'
            }
        },
        jshint: {
            achilles: {
                src: ['js/**/*.js']
            }
        },
        uglify: {
            options: {
                compress: true,
                //beautify: true,
                mangle: true,
                sourceMap: true
            },
            achilles: {
                src: '<%= paths.src.jsAchilles %>',
                dest: '<%= paths.dest.jsAchillesMin %>'
            },
            vendor: {
                src: '<%= paths.src.jsVendor %>',
                dest: '<%= paths.dest.jsVendorMin %>'
            }
        },
        concat: {
            options: {
                separator: '\n',
                sourceMap: true
            },
            build: {
                src: '<%= paths.src.jsMin %>',
                dest: '<%= paths.dest.jsApp %>'
            }
        },
        watch: {
            achilles: {
                files: '<%= paths.src.jsAchilles %>',
                tasks: ['build-achilles']
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('build-achilles', ['jshint', 'uglify:achilles', 'concat']);
    grunt.registerTask('build', ['uglify', 'concat']);
}