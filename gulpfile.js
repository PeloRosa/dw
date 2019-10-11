// 复制页面内容
var gulp = require("gulp");
var sass = require("gulp-sass");

gulp.task("copy-html",function(){
    return gulp.src("index.html").pipe(gulp.dest("F:\\publishspace\\DW_publish"));
});

gulp.task("copyAllFile",function(){
    return gulp.src("*/**/*").pipe(gulp.dest("F:\\publishspace\\DW_publish"));
});

// gulp.task("copy-data",function(){
//     return gulp.src(["json/*.json","!json/filter.json"]).pipe(gulp.dest("F:\\publishspace\\DW_publish\\"));
// });

//自动生成sass编译后文件
gulp.task("sass",function(){
    return gulp.src("stylesheet/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("F:\\publishspace\\DW_publish\\css"));
});

gulp.task("watchall",async ()=>{
    //定义一个监听器，监听文件是否有改变，如果有改变，则自动拷贝。
    gulp.watch("*.html",async ()=>{
        gulp.src("*.html")
        .pipe(gulp.dest("F:\\publishspace\\DW_publish"));
    });

    gulp.watch("js/*.js",async ()=>{
        gulp.src("js/*.js")
        .pipe(gulp.dest("F:\\publishspace\\DW_publish\\js"));
    });

    gulp.watch("css/*.css",async ()=>{
        gulp.src("css/*.css")
        .pipe(gulp.dest("F:\\publishspace\\DW_publish\\css"));
    });

    gulp.watch("stylesheet/**/*.scss",async ()=>{
        gulp.src("stylesheet/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("F:\\publishspace\\DW_publish\\css"));
    });

});

