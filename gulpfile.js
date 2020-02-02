const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require("gulp-sass");


//компиляция scss в css
gulp.task("scss", function() {
    return gulp
        .src("./src/scss/main.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/css/"))
        .pipe(browserSync.stream());
});

//gulp task для поднятия локального сервера
gulp.task("server", function() {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
});

//следим за файлами и обновляем браузер
gulp.task("watch", function() {
    watch(
        ["./src/*.html", "./src/js/*.js", "./src/img/*.*"],
        gulp.parallel(browserSync.reload)
    );

    watch('./src/scss/**/*.scss', function() {
        setTimeout(gulp.parallel("scss"), 1000);
    });
});


//запускаем галп
gulp.task('default', gulp.series("scss", gulp.parallel('server', 'watch')));



//создаем первый галп таск
// gulp.task('hello', function(callback){
//     console.log("Hello, from gulp");
//     callback();
// });

// gulp.task('goodbye', function(callback){
//     console.log("Bye-bye, from gulp");
//     callback();
// });


//последовательное выполнение задач
// gulp.task('default', gulp.series('hello', 'goodbye'));

//параллельное выполнение задач
// gulp.task('default', gulp.parallel('hello', 'goodbye'));
