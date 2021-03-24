const gulp = require('gulp')
const concat = require('gulp-concat')

gulp.task('build-script', function () {
	return gulp
		.src('./build/static/js/*.js')
		.pipe(concat('gdxintake.js'))
		.pipe(gulp.dest('./dist/js'))
        .pipe(gulp.dest('a:/GDXBIF/SiteAssets/js'))  //dev
        // .pipe(gulp.dest('y:/VDRoom/SiteAssets/js'))  //uat (dev)
})

gulp.task('build-css', function () {
	return gulp
		.src('./build/static/css/*.css')
		.pipe(concat('gdxintake.css'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(gulp.dest('a:/GDXBIF/SiteAssets/css'))  //dev

})

gulp.task('dev', gulp.parallel(['build-script', 'build-css']))
