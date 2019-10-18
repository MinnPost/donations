// Require our dependencies
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const fs = require('fs');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const packagejson = JSON.parse(fs.readFileSync('./package.json'));
const mqpacker = require( 'css-mqpacker' );
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sort = require( 'gulp-sort' );
const sourcemaps = require('gulp-sourcemaps');
const svgmin = require( 'gulp-svgmin' );
const uglify = require('gulp-uglify');

// Some config data for our tasks
const config = {
  styles: {
    src: 'static/sass/*.scss',
    dest: 'static/css'
  },
  scripts: {
    src: [ './static/js/vendor/**/*.js', './static/js/src/**/*.js' ],
    uglify: [ 'static/js/*.js', '!static/js/*.min.js' ],
    dest: './static/js'
  },
  images: {
  	main: './static/img/**/*',
  	dest: './static/img/'
  },
  browserSync: {
    active: false,
    localURL: 'mylocalsite.local'
  }
};

function styles() {
  return gulp.src(config.styles.src )
    .pipe(sourcemaps.init()) // Sourcemaps need to init before compilation
    .pipe(sassGlob()) // Allow for globbed @import statements in SCSS
    .pipe(sass()) // Compile
    .on('error', sass.logError) // Error reporting
    .pipe(postcss([
      mqpacker( {
        'sort': true
      } ),
      cssnano( {
        'safe': true // Use safe optimizations.
      } ) // Minify
    ]))
    .pipe(rename({ // Rename to .min.css
      suffix: '.min'
    }))
    .pipe(sourcemaps.write()) // Write the sourcemap files
    .pipe(gulp.dest(config.styles.dest)) // Drop the resulting CSS file in the specified dir
    .pipe(browserSync.stream());
}

function mainscripts() {
  return gulp.src(config.scripts.src, { allowEmpty: true })
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(concat('main.js')) // Name the JS file
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(browserSync.stream());
}

function uglifyscripts() {
  return gulp.src(config.scripts.uglify)
    .pipe(uglify()) // Minify + compress
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(browserSync.stream());
}

// Optimize Images
function images() {
  return gulp
    .src(config.images.main)
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest(config.images.dest));
}

function svgminify() {
	return gulp.src( config.images.main + '.svg' )
        .pipe(svgmin())
        .pipe(gulp.dest(config.images.dest));
}

// Injects changes into browser
function browserSyncTask() {
  if (config.browserSync.active) {
    browserSync.init({
      proxy: config.browserSync.localURL
    });
  }
}

// Reloads browsers that are using browsersync
function browserSyncReload(done) {
  browserSync.reload();
  done();
}

// Watch directories, and run specific tasks on file changes
function watch() {
  gulp.watch(config.styles.srcDir, styles);
  gulp.watch(config.scripts.admin, adminscripts);
  
  // Reload browsersync when PHP files change, if active
  if (config.browserSync.active) {
    gulp.watch('./**/*.php', browserSyncReload);
  }
}

// define complex gulp tasks
const scripts = gulp.series(mainscripts, uglifyscripts);
const build   = gulp.series(gulp.parallel(styles, scripts, images, svgminify));

// export tasks
exports.styles    = styles;
exports.scripts   = scripts;
exports.images    = images;
exports.svgminify = svgminify;
exports.watch     = watch;
exports.default   = build;
