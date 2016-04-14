var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    del = require('del'),
    inject = require('gulp-inject'),
    serve = require('gulp-serve'),
    jshint = require('gulp-jshint'),
    files = require('./gulp/gulp.config.js'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify'),
    concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css');;

gulp.task('default', function(callback){
    runSequence('build', 'watch', 'serve', callback);
});

gulp.task('build', function(callback){
    runSequence('clean', 'copy-build', 'index',callback);
});

gulp.task('serve', serve('build'));

gulp.task('index', ['compJs', 'compCss'], function(){
    return gulp
            .src('./index.start.html')
            .pipe(inject(gulp.src(['./build/script/**/all-min.js','./build/css/**/all-min.css']), {ignorePath: 'build', addRootSlash: false}))
            .pipe(gulp.dest(files.build_dir));
});

gulp.task('compJs', function(){
    return gulp
            .src(files.app_files.tpl_src_js)
            .pipe(concat('all.js'))
            .pipe(minify())
            .pipe(gulp.dest(files.build_dir + '/script'));
});

gulp.task('compCss', function(){
    return gulp
            .src(files.app_files.tpl_src_css)
            .pipe(concatCss('all-min.css'))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest(files.build_dir + '/css'));
});

gulp.task('clean', function(){
    return del([files.build_dir], {force: true});
});

gulp.task('copy-build', ['copy-data', 'copy-assets', 'copy-app-js', 'copy-vendor-js']);

gulp.task('copy-data', function(){
    return gulp
        .src('./data/**/*.json')
        .pipe(gulp.dest('./build/data'));
});

gulp.task('copy-assets', function(){
    return gulp
            .src('./assets/**/*')
            .pipe(gulp.dest('./build/assets'));
});

gulp.task('copy-app-js', function(){
    return gulp
            .src('./app/**/*')
            .pipe(gulp.dest('./build/app'));
});

gulp.task('copy-vendor-js', function(){
    return gulp
            .src('./vendor/**/*.js')
            .pipe(gulp.dest('./build/vendor'));
});

gulp.task('lint', function(){
    return gulp
            .src(files.app_files.js)
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
});

gulp.task('watch', function(){
    gulp.watch(files.app_files.js, ['lint', 'build']);
});