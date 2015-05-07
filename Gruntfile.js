module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        paths: {
            src: {
                js: [
                    'config/config.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-resource/angular-resource.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'bower_components/ngLocale/angular-locale_de-ch.js',
                    'bower_components/angular-bootstrap/ui-bootstrap.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                    'bower_components/toastr/toastr.js',
                    'js/**/*.js'
                ],
                jsMin: [
                    'bower_components/jquery/dist/jquery.min.js',
                    '<%= paths.dest.jsMin %>',
                    'bower_components/select2/select2.min.js',
                    'bower_components/angular-select2/dist/angular-select2.min.js',
                    'bower_components/textAngular/dist/textAngular-rangy.min.js',
                    'bower_components/textAngular/dist/textAngular-sanitize.min.js',
                    'bower_components/textAngular/dist/textAngular.min.js',
                ]
            },
            dest: {
                jsMin: 'build/achilles.min.js',
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
            target: {
                src: '<%= paths.src.js %>',
                dest: '<%= paths.dest.jsMin %>'
            }
        },
        concat: {
            options: {
                separator: '\n'
            },
            build: {
                src: '<%= paths.src.jsMin %>',
                dest: '<%= paths.dest.jsApp %>'
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('build', ['uglify', 'concat']);
}