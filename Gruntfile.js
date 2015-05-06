module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            achilles: {
                src: ['js/**/*.js']
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-jshint');
}