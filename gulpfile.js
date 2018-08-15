var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var compass = require('gulp-compass');
var jade = require('gulp-jade');
var webserver = require('gulp-webserver');
var clean = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var extender = require('gulp-html-extend');

// font
gulp.task('clean-fonts', function() {
    return gulp.src('build/assets/fonts/*', {
            read: false
        })
        .pipe(clean());
});
gulp.task('fonts', ['clean-fonts'], function() {
    return gulp.src('src/assets/fonts/**/*')
        .pipe(gulp.dest('build/assets/fonts/'));
});

// image
gulp.task('clean-images', function() {
    return gulp.src('build/assets/images/*', {
            read: false
        })
        .pipe(clean());
});
gulp.task('images', ['clean-images'], function() {
    return gulp.src('src/assets/images/**/*')
        .pipe(gulp.dest('build/assets/images/'));
});

// css
// gulp.task('clean-css', function() {
//     return gulp.src('build/assets/css/*', {
//             read: false
//         })
//         .pipe(clean());
// });
// gulp.task('css', ['clean-css'], function() {
//     return gulp.src('src/assets/css/**/*.scss')
//         .pipe(compass({
//             config_file: './src/assets/css/config.rb',
//             css: 'src/assets/css/',
//             sass: 'src/assets/css/',
//             image: 'src/assets/images/',
//             sourcemap: false,
//             // style: 'nested', // nested, expanded, compact, compressed
//             style: 'expanded',
//             comments: false
//         }))
//         .pipe(autoprefixer({
//             browsers: ['last 5 versions'],
//             cascade: false
//         }))
//         // .pipe(uglifycss())
//         .pipe(gulp.dest('build/assets/css/'))
// });

// js
gulp.task('clean-js', function() {
    return gulp.src('build/assets/js/*', {
            read: false
        })
        .pipe(clean());
});
gulp.task('concat-js', function() {
    return gulp.src(['src/assets/js/plugins/slick.min.js'])
        // .pipe(concat('lib.js'))
        .pipe(gulp.dest('build/assets/js/'));
});

gulp.task('js', ['clean-js', 'concat-js'], function() {
    return gulp.src('src/assets/js/**/*.js')
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        // .pipe(uglify())
        .pipe(gulp.dest('build/assets/js/'));
});

// JADE to HTML
gulp.task('clean-html', function() {
    return gulp.src('build/*.html', {
            read: false
        })
        .pipe(clean());
});
// gulp.task('html', ['clean-html'], function() {
//     gulp.src('src/*.jade')
//         .pipe(jade({
//             pretty: true
//         }))
//         .pipe(gulp.dest('build/'))
// })
gulp.task('html', ['clean-html'], function() {
    gulp.src('src/views/application/*.html')
        .pipe(extender({
            annotations: false,
            verbose: false
        }))
        .pipe(gulp.dest('build/'))
})

// 監聽檔案
gulp.task('watch', function() {
    // gulp.watch('src/assets/css/*.scss', ['css']);
    // gulp.watch('src/assets/css/base/*.scss', ['css']);
    // gulp.watch('src/assets/css/page/*.scss', ['css']);
    // gulp.watch('src/assets/css/partials/*.scss', ['css']);
    gulp.watch('src/assets/js/**', ['js']);
    gulp.watch('src/assets/js/**/**', ['js']);
    gulp.watch('src/assets/images/**', ['images']);
    gulp.watch('src/assets/fonts/**', ['fonts']);
    // gulp.watch('src/*', ['html']);
    gulp.watch('src/views/**/*', ['html']);
});

// 本機伺服器
gulp.task('webserver', function() {
    gulp.src('build/')
        .pipe(webserver({
            host: '0.0.0.0',
            port: 8080,
            livereload: true,
            directoryListing: false,
            // open: true,
            fallback: '/1-1.html'
        }));
});

gulp.task('default', ['html', 'js', 'images', 'fonts'], function() {
    gulp.start('webserver');
    gulp.start('watch');
});