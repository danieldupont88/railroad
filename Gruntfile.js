module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      all: {
        files: ['Gruntfile.js', 'bin/**/*.js', 'test/**/*.js', '!node_modules/**'],
        tasks: ['exec:cmd_mocha'],
        options: {
          spawn: false
        }
      }
    },
    exec: {
      cmd_mocha: {
        cmd: 'mocha'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.registerTask('default', ['watch']);

};