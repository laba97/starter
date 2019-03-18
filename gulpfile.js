/* PACKAGES */
var gulp = require('gulp');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');

/* PATHS */
var sassFiles = 'src/scss/*';
var sassSource = 'src/scss/main.scss';
var outputCSS = 'public/css';

/* TASKS */

/*
    compile SASS/SCSS into CSS
    @name: sass
    @input: .scss
    @output: .css
*/
gulp.task('sass', function(){
    return gulp.src(sassSource)
        .pipe(sass())
        .pipe(rename('app.css'))
        .pipe(gulp.dest(outputCSS));
});

/*
    watch tasks
    @name: css-watch
    @name: js-watch
*/
gulp.task('css-watch', ['sass'], browserSync.reload);

/*
    global watch task
    @name: watch
*/
gulp.task('watch', ['sass'], function(){
    browserSync({
        server: {
            baseDir: 'public/'
        }
    });
    gulp.watch(sassFiles, ['css-watch']);
});

/*
    default task
    @name: default
*/
gulp.task('default', function(callback){
    runSequence('sass', callback);
});