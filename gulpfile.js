var gulp = require('gulp'),
webpack = require('webpack'),
browserSync = require('browser-sync').create(),
postcss = require('gulp-postcss'),
rgba = require('postcss-hexrgba'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
colorFunctions = require('postcss-color-function');

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, rgba, colorFunctions, autoprefixer]))
    .on('error', (error) => console.log(error.toString()))
    .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('scripts', function(callback) {
  webpack(require('./webpack.config.js'), function(err, stats) {
    if (err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    callback();
  });
});

gulp.task('watch', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  gulp.watch('./app/index.html', function() {
    browserSync.reload();
  });

  gulp.watch('./app/assets/styles/**/*.css',['waitForStyles']);

  gulp.watch([  './app/assets/scripts/modules/*.js',  './app/assets/scripts/scripts.js'], ['waitForScripts']);
});

gulp.task('waitForStyles', ['styles'], function() { 
  console.log("waiting for streaming");
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('waitForScripts', ['scripts'], function() {
  browserSync.reload();
});