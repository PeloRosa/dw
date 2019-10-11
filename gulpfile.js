// 复制页面内容
var gulp = require("gulp");
var uglify = require("gulp-uglify");
// gulp.task("copy-html",function(){
//     return gulp.src("index.html").pipe(gulp.dest("F:\\千峰资料\\HTML上课资料\\第二阶段\\Day33【Gulp】\\myfile"));
// });

gulp.task("copyAndCom",function(){
    return gulp.src(["js/**/*"])
    .pipe(uglify())
    .pipe(gulp.dest("F:\\publishspace\\DW"));
});

// gulp.task("copy-data",function(){
//     return gulp.src(["json/*.json","!json/filter.json"]).pipe(gulp.dest("F:\\千峰资料\\HTML上课资料\\第二阶段\\Day33【Gulp】\\myfile\\data"));
// });

const babel = require("gulp-babel");
const es2015Preset = require("babel-preset-es2015");

gulp.watch("js/*.js",async ()=>{
        gulp.src("js/index.js")
        .pipe(babel({presets:[es2015Preset]}))
        .pipe(uglify())
        .pipe(gulp.dest("E:\\phpStudy\\WWW\\CoolWind\\TianMao\\js"));
    });


