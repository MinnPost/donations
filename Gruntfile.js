module.exports = function(grunt) {

  /**
   * Initialize grunt
   */
  grunt.initConfig({

    /**
     * Read package.json
     */
    pkg: grunt.file.readJSON('package.json'),


    /**
     * Set banner
     */
    banner: '/**\n' +
    '<%= pkg.title %> - <%= pkg.version %>\n' +
    '<%= pkg.homepage %>\n' +
    'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
    'License: <%= pkg.license %>\n' +
    '*/\n',


    /**
     * Set directory paths
     */
    dir: {
      js: 'static/js',
      css: 'static/css',
      //sass: 'sass',
      img: 'static/img'
    },


    /**
     * Minify .svg
     * @github.com/sindresorhus/grunt-svgmin
     */
    svgmin: {
      options: {
        plugins: [{
            // Prevent removing the viewBox attr. Previously caused issues in IE9+.
            removeViewBox: false
        }]
      },
      dist: {
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: '<%= dir.img %>/', // Src matches are relative to this path.
          src: ['**/*.prodsvg'], // Actual pattern(s) to match.
          dest: '<%= dir.img %>/', // Destination path prefix.
        }],
      }
    },


    /**
     * Compress .jpg/.png
     * @github.com/gruntjs/grunt-contrib-imagemin
     */
    imagemin: {
      dist: {
        options: {
            optimizationLevel: 3,
            progressive: true
        },
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: '<%= dir.img %>/', // Src matches are relative to this path.
          src: '{,*/}*.{png,jpg,jpeg}', // Actual pattern(s) to match.
          dest: '<%= dir.img %>/', // Destination path prefix.
        }],
      }
    },


    /**
     * Convert .svg to .png
     * @github.com/dbushell/grunt-svg2png
     */
    svg2png: {
      dist: {
        files: [{
          src: ['<%= dir.img %>/**/*.svg'],
        }],
      }
    },


    /**
     * JSHint
     * @github.com/gruntjs/grunt-contrib-jshint
     */
    jshint: {
      gruntfile: 'Gruntfile.js',
      files: ['<%= dir.js %>/src/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },


    /**
     * Concatenate
     * @github.com/gruntjs/grunt-contrib-concat
     */
    concat: {
      options: {
        stripBanners: true,
        //banner: '<%= banner %>',
        separator: ''
      },
      js: {
        src: [
            '<%= dir.js %>/vendor/stripe.payment.js',
            '<%= dir.js %>/src/minnpost.giving.js',
            '<%= dir.js %>/src/main.js'
        ],
        dest: '<%= dir.js %>/main.js'
      },
    },

    autoprefixer: {
      dev: {
            options: {
              browsers: ['last 2 versions']
            },
            src: '<%= dir.css %>/main.scss.css',
            dest: '<%= dir.css %>/main.scss.css'
        },
        dist: {
            options: {
              browsers: ['last 2 versions']
            },
            src: '<%= dir.css %>/main.scss.css',
            dest: '<%= dir.css %>/main.scss.css'
        }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '<%= dir.css %>',
          src: ['*.css', '!*.min.css'],
          dest: '<%= dir.css %>',
          ext: '.min.css'
        }]
      }
    },

    /**
     * Minify
     * @github.com/gruntjs/grunt-contrib-uglify
     */
    uglify: {

      // Uglify options

      // Minify js files in js/src/
      dist: {
        src: ['<%= concat.js.dest %>'],
        dest: '<%= dir.js %>/main.min.js'
      },
    },


    /**
     * Clean files
     * @github.com/gruntjs/grunt-contrib-clean
     */
    clean: {
      // Nothing yet!
    },


    /**
     * Watch
     * @github.com/gruntjs/grunt-contrib-watch
     */
    watch: {

      // JShint Gruntfile
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
      },

      // JShint, concat + uglify JS on change
      js: {
        files: '<%= jshint.files %>',
        tasks: ['jshint', 'concat', 'uglify']
      },

    }
  });


  /**
   * Default Task
   * run `grunt`
   */
  grunt.registerTask('default', [
    'jshint',           // JShint
    'concat:js',        // Concatenate main JS files
    'uglify',           // Minifiy concatenated JS file
    //'compass:dev',      // Compile Sass with dev settings
    'autoprefixer:dev', // add prefixes to css
  ]);


  /**
   * Production tast, use for deploying
   * run `grunt production`
   */
  grunt.registerTask('production', [
    'jshint',           // JShint
    'concat:js',        // Concatenate main JS files
    'uglify',           // Minifiy concatenated JS file
    //'compass:dist',     // Compile Sass with distribution settings
    'svg2png',          // Convert svg files to png
    'svgmin',           // Compress svg files
    'imagemin',         // Compress jpg/jpeg + png files
    'autoprefixer:dist',// add prefixes to css
  ]);


  /**
   * Image Tasks
   * run `grunt images`
   */
  grunt.registerTask('images', [
    'svg2png',          // Convert svg files to png
    'svgmin',           // Compress svg files
    'imagemin',         // Compress jpg/jpeg + png files
  ]);


  /**
   * Load the plugins specified in `package.json`
   */
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-svg2png');

};