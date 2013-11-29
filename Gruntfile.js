module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/concat.js', //'src/**/*.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }, //uglify
    karma: {
	unit: {
  		configFile: 'karma-conf.js',
		autoWatch: true
   	 },
	 continuous: {
	     configFile: 'karma-conf.js',
	     singleRun: true,
	     browsers: ['Chrome']
         }

    },

	jshint: {
		//jshintrc: true, //search for .jshintrc files
		files: ['src/**/*.js']

	},
  
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-karma'); 

  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
};
