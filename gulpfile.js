(function() {
  'use strict';

  const gulp = require('gulp'),
    //sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    uglifyJs = require('gulp-uglifyes'),
    uglifycss = require('gulp-uglifycss'),
    pug = require('gulp-pug'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    postcss = require('gulp-postcss'),
    sugarss = require('sugarss');

  //write html by pug
  gulp.task('views', function buildHTML() {
    return gulp
      .src('app/assets/views/*.pug')
      .pipe(
        pug({
          pretty: true
        })
      )
      .pipe(gulp.dest('dest/'));
  });

  //write style
  gulp.task('postcss', function() {
    const processors = [
      require('postcss-import'),
      require('postcss-alias'),
      require('postcss-short-text'),
      require('postcss-short-spacing'),
      require('postcss-pseudo-content-insert'),
      require('postcss-position'),
      require('lost'),
      require('postcss-nested-ancestors'),
      require('postcss-nested'),
      require('postcss-inline-media'),
      require('postcss-simple-vars'),
      require('postcss-responsive-type'),
      require('postcss-extend'),
      require('postcss-mixins'),
      require('postcss-inline-svg'),
      require('autoprefixer'),
      require('postcss-unique-selectors'),
      require('css-mqpacker')
    ];
    return gulp
      .src('app/styles/main.sss')
      .pipe(sourcemaps.init())
      .pipe(
        postcss(processors, { parser: sugarss }).on('error', notify.onError())
      )
      .pipe(sourcemaps.write('.'))
      .pipe(rename({ extname: '.css' }))
      .pipe(gulp.dest('dest/styles/'));
  });
  gulp.task('css', function() {
    return gulp.src('app/styles/css/*.*').pipe(gulp.dest('dest/styles/'));
  });

  // write js
  gulp.task('scripts', function() {
    return gulp.src('app/scripts/**').pipe(gulp.dest('dest/scripts'));
  });

  //delete dest folder
  gulp.task('clean', function() {
    return del('dest');
  });

  //lib
  gulp.task('libs-css', function() {
    return (
      gulp
        .src(['app/libs/libs.scss'])
        //.pipe(sass().on('error', notify.onError()))
        .pipe(uglifycss())
        .pipe(rename('libs.min.css'))
        .pipe(gulp.dest('dest/styles/'))
    );
  });
  gulp.task('libs-js', function() {
    return gulp
      .src('app/libs/**/*.js')
      .pipe(concat('libs.min.js'))
      .pipe(gulp.dest('dest/scripts/'));
  });
  //copy all assets files
  gulp.task('assets', function() {
    return gulp
      .src('app/assets/**', {
        since: gulp.lastRun('assets')
      })
      .pipe(gulp.dest('dest'));
  });

  //run task for build once
  gulp.task(
    'build',
    gulp.series(
      'clean',
      gulp.parallel(
        'postcss',
        'views',
        'css',
        'libs-css',
        'libs-js',
        'assets',
        'scripts'
      )
    )
  );

  //up static server; watching change in dest and reload page
  gulp.task('server', function() {
    browserSync.init({
      server: 'dest',
      notify: false
    });

    browserSync.watch('dest/**/*.*').on('change', browserSync.reload);
  });

  //watching by all files in dest
  gulp.task('watch', function() {
    gulp.watch('app/styles/css/**/*.*', gulp.series('css'));
    gulp.watch('app/styles/**/*.*', gulp.series('postcss'));
    gulp.watch('app/scripts/**/*.*', gulp.series('scripts'));
    gulp.watch('app/assets/**/*.*', gulp.series('assets'));
    gulp.watch('app/assets/views/**/*.*', gulp.series('views'));
    gulp.watch('app/libs/**/*.js', gulp.series('libs-js'));
    gulp.watch('app/libs/libs.scss', gulp.series('libs-css'));
  });

  gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'server')));
})();
