// 复制页面内容
var gulp = require("gulp");
var sass = require("gulp-sass");

gulp.task("copy-html",function(){
    return gulp.src("index.html").pipe(gulp.dest("D:\\phpStudy\\WWW\\DW"));
});

gulp.task("copyAllFile",function(){
    return gulp.src(["*/**/*","!scss/**/*","!node_modules/**/*","*.html"]).pipe(gulp.dest("D:\\phpStudy\\WWW\\DW"));
});

// gulp.task("copy-data",function(){
//     return gulp.src(["json/*.json","!json/filter.json"]).pipe(gulp.dest("D:\\phpStudy\\WWW\\DW\\\\"));
// });

//自动生成sass编译后文件
// gulp.task("sass",function(){
//     return gulp.src("stylesheet/**/*.scss")
//     .pipe(sass())
//     .pipe(gulp.dest("D:\\phpStudy\\WWW\\DW\\css"));
// });

gulp.task("watchall",async ()=>{
    //定义一个监听器，监听文件是否有改变，如果有改变，则自动拷贝。
    gulp.watch("*.html",async ()=>{
        gulp.src("*.html")
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\DW"));
    });

    gulp.watch("js/*.js",async ()=>{
        gulp.src("js/*.js")
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\DW\\js"));
    });

    gulp.watch("css/*.css",async ()=>{
        gulp.src("css/*.css")
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\DW\\css"));
    });

    gulp.watch("php/*.php",async ()=>{
        gulp.src("php/*.php")
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\DW\\php"));
    });

    gulp.watch("scss/**/*.scss",async ()=>{
        gulp.src("scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("F:\\workspace\\Git_Project\\dw\\css"));
    });

});

