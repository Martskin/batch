var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    neat = require('node-neat').includePaths,
    package = require('./package.json'),
    dist_dir = 'app/assets/css',
    temp_dir = 'app/templates/css',
    $ = require('gulp-load-plugins')();

var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');

/**
 * Error notification settings
 */
function errorAlert(err) {
  $.notify.onError({
    message:  '<%= error.message %>',
    sound:    'Sosumi'
  })(err);
  console.log(err.toString());
}

gulp.task('css', function () {
    gulp.src('src/scss/*.scss')
    .pipe( $.plumber({ errorHandler: errorAlert }) )
    .pipe($.sass({
      includePaths: ['styles'].concat(neat)
    }))
    .on( 'error', function(err) {
      new $.util.PluginError(
        'CSS',
        err,
        {
          showStack: true
        }
      );
    })
    .pipe(autoprefixer('last 4 version'))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest(dist_dir))
    .pipe(gulp.dest(temp_dir))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(dist_dir))
    .pipe(gulp.dest(temp_dir))
    .pipe(browserSync.reload({stream:true,notify: true}))
    .on( 'error', errorAlert )
    .pipe(
      $.notify({
        message:  'Styles have been compiled and minified into assets/css and templates/css directories.',
        onLast:   true
      })
    );
});

gulp.task('js',function(){
  gulp.src('src/js/scripts.js')
    .pipe( $.plumber({ errorHandler: errorAlert }) )
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}))
    .on( 'error', errorAlert )
    .pipe(
      $.notify({
        message:  'Scripts have been compiled and minified into assets/js directory.',
        onLast:   true
      })
    );
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "app"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['css', 'js', 'browser-sync'], function () {
    gulp.watch("src/scss/*/*.scss", ['css']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("app/*.html", ['bs-reload']);
});