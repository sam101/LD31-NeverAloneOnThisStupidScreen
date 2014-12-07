module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['static/js/**/*.js'],
				dest: 'static/ld31.min.js'
			}
		},
		uglify: {
			dist: {
				files: {
					'static/ld31.min.js': ['static/ld31.min.js']
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['concat', 'uglify']);
};	