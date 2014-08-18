var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	minifyCSS = require('gulp-minify-css');
 	rename = require('gulp-rename');

/* Environment Path */
var path = {
  public:             "public/",
  src:                "src/",
  sass:               function(){ return this.src },
  buildCSS:           function(){ return this.public + "/css/" },
};


// compile sass files
gulp.task('sass', function () {
  return gulp.src(path.sass() + '*.scss')
    .pipe(sass({
      sourcemap: true,
      trace: true,
      loadPath: __dirname + '/src'
   }))
    .pipe(gulp.dest(path.buildCSS()));
});

// minimise css file
gulp.task('cssmin', function () {
    gulp.src(path.buildCSS() + 'style.css')
        .pipe(minifyCSS({
        	keepBreaks:false,
        	keepSpecialComments: 0
        }))
        .pipe(gulp.dest(path.buildCSS()));
});

// watch changes
gulp.task('watch', function () {
	gulp.watch( path.sass() + '**/*.scss', ['sass']);
	gulp.watch( path.buildCSS() + 'style.css', ['cssmin']);
});


// Default Task
gulp.task('default', ['watch']);



