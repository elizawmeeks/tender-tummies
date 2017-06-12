module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      dist: {
        src: ['app/**/*.js'],
        dest: 'dist/app.js',
      },
    },
    jshint: {
      options: {
        predef: [ "document", "console", "$", "$scope", "firebase" ],
        esnext: true,
        globalstrict: true,
        globals: {"angular": true, "app": true}
      },
      files: ['../app/**/*.js']
    },
    sass: {
      dist: {
        files: {
          '../css/main.css': '../sass/main.sass'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['../app/**/*.js'],
        tasks: ['jshint']
      },
      sass: {
        files: ['../sass/**/*.sass'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'watch', 'concat']);
};