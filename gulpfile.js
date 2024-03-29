const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('build-script-dev', function () {
  return gulp
    .src('./build/static/js/*.js')
    .pipe(concat('gdxintake.js'))
    .pipe(gulp.dest('./dist/js'))
    // .pipe(gulp.dest('a:/GDXBIF/SiteAssets/js')); //dev
  // .pipe(gulp.dest('y:/VDRoom/SiteAssets/js'))  //uat (dev)
});

gulp.task('build-css-dev', function () {
  return gulp
    .src('./build/static/css/*.css')
    .pipe(concat('gdxintake.css'))
    .pipe(gulp.dest('./dist/css'))
    // .pipe(gulp.dest('a:/GDXBIF/SiteAssets/css')); //dev
});

gulp.task('build-script-uat', function () {
  return gulp
    .src('./build/static/js/*.js')
    .pipe(concat('gdxintake.js'))
    .pipe(gulp.dest('./dist/js'))
    // .pipe(gulp.dest('b:/GDXBIF/SiteAssets/js')); //uat
});

gulp.task('build-css-uat', function () {
  return gulp
    .src('./build/static/css/*.css')
    .pipe(concat('gdxintake.css'))
    .pipe(gulp.dest('./dist/css'))
    // .pipe(gulp.dest('b:/GDXBIF/SiteAssets/css')); //uat
});

gulp.task('build-script-prod', function () {
  return gulp
    .src('./build/static/js/*.js')
    .pipe(concat('gdxintake.js'))
    .pipe(gulp.dest('./dist/js'))
    // .pipe(gulp.dest('e:/SiteAssets/js')); //prod
});

gulp.task('build-css-prod', function () {
  return gulp
    .src('./build/static/css/*.css')
    .pipe(concat('gdxintake.css'))
    .pipe(gulp.dest('./dist/css'))
    // .pipe(gulp.dest('e:/SiteAssets/css')); //prod
});

gulp.task('build-script-devuat', function () {
  return gulp
    .src('./build/static/js/*.js')
    .pipe(concat('gdxintake.js'))
    .pipe(gulp.dest('./dist/js'))
    // .pipe(gulp.dest('b:/GDXBIFUAT/SiteAssets/js')); //uat
});

gulp.task('build-css-devuat', function () {
  return gulp
    .src('./build/static/css/*.css')
    .pipe(concat('gdxintake.css'))
    .pipe(gulp.dest('./dist/css'))
    // .pipe(gulp.dest('b:/GDXBIFUAT/SiteAssets/css')); //uat
});

gulp.task('dev', gulp.parallel(['build-script-dev', 'build-css-dev']));
gulp.task('uat', gulp.parallel(['build-script-uat', 'build-css-uat']));
gulp.task('prod', gulp.parallel(['build-script-prod', 'build-css-prod']));

gulp.task('devuat', gulp.parallel(['build-script-devuat', 'build-css-devuat']));
