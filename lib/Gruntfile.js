module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      dist: {
        // the files to concatenate
        src: ['../app/**/*.js'],
        // the location of the resulting JS file
        dest: '../dist/app.js'
      }
    },
    jshint: {
      options: {
        predef: [ "document", "console", "$", "$scope", "firebase", "pdfMake" ],
        esnext: true,
        globalstrict: true,
        globals: {"angular": true, "app": true}
      },
      files: ['../app/**/*.js']
    },
    sass: {
      dist: {
        files: {
          '../dist/main.css': '../sass/main.sass'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['../app/**/*.js'],
        tasks: ['jshint', 'concat']
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