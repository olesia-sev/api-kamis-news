const gulp = require('gulp');
const pug = require('gulp-pug');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const path = require('path');

const paths = {
  root: './build',
  templates: {
    src: 'src/index.pug',
    dest: 'build/'
  },
  styles: {
    src: 'src/styles/main.scss',
    dest: 'build/styles'
  },
  // images: {
  //   src: 'src/images/*.*',
  //   dest: 'build/images/'
  // },
  scripts: {
    src: 'src/scripts/*.js',
    dest: 'build/scripts/'
  },
  fonts: {
    src: 'src/fonts/*.*',
    dest: 'build/fonts/'
  }
}

//pug
function templates() {
  return gulp
    .src(paths.templates.src)
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(paths.templates.dest));
}

//scss
function styles() {
  return gulp
    .src('./src/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths,
      outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest))
}

//clean
function clean() {
  return del(paths.root);
}

//browser-sync, gulp вотчер
function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.scripts.src, scripts);
}

//локальный сервер, встроенный
function server() {
  browserSync.init({
    server: paths.root
  });
  browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

//scripts, webpack
function scripts() {
  return gulp.src('src/scripts/main.js')
     // .pipe(gulpWebpack(webpackConfig, webpack)) 
      .pipe(gulp.dest(paths.scripts.dest));
}

exports.templates = templates;

exports.styles = styles;

exports.clean = clean;

exports.scripts = scripts;

exports.watch = watch;

exports.server = server;

gulp.task('default', gulp.series(
  clean,
  gulp.parallel(styles, templates, scripts),
  gulp.parallel(watch, server)
));