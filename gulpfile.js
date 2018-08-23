/* PACKAGES */
var gulp = require('gulp');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var tsc = require('gulp-typescript');
var tsProject = tsc.createProject('tsconfig.json');

/* PATHS */
var typeScriptFiles = 'src/ts/*';
var typeScriptSource = 'src/ts/main.ts';
var outputJS = 'public/js';
var sassFiles = 'src/scss/*';
var sassSource = 'src/scss/main.scss';
var outputCSS = 'public/css';

/* TASKS */

/*
    compile TypeScript into JavaScript
    @name: ts
    @input: .ts
    @output: .js
*/
gulp.task('ts', function(){
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(outputJS));
});

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
gulp.task('js-watch', ['ts'], browserSync.reload);
gulp.task('css-watch', ['sass'], browserSync.reload);

/*
    global watch task
    @name: watch
*/
gulp.task('watch', ['ts', 'sass'], function(){
    browserSync({
        server: {
            baseDir: 'public/'
        }
    });
    gulp.watch(typeScriptFiles, ['js-watch']);
    gulp.watch(sassFiles, ['css-watch']);
});

/*
    default task
    @name: default
*/
gulp.task('default', function(callback){
    runSequence('ts', 'sass', callback);
});