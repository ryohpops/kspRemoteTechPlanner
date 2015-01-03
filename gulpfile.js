'use strict';

var rimraf = require("rimraf");
var gulp = require("gulp");
var minjs = require("gulp-uglify");
var mincss = require("gulp-minify-css");

var destDir = "deploy/";

gulp.task("clean", function (cb) {
    rimraf(destDir, cb);
});

gulp.task("deploy", ["clean"], function () {
    gulp.src("kspRemoteTechPlanner/**/*.html")
    .pipe(gulp.dest(destDir));

    gulp.src("kspRemoteTechPlanner/**/appOut.js")
    .pipe(minjs())
    .pipe(gulp.dest(destDir));

    gulp.src("kspRemoteTechPlanner/**/app.css")
    .pipe(mincss())
    .pipe(gulp.dest(destDir));

    gulp.src(["kspRemoteTechPlanner/**/content/bootstrap.min.css", "kspRemoteTechPlanner/**/fonts/*", "kspRemoteTechPlanner/**/scripts/*.min.js"])
    .pipe(gulp.dest(destDir));
});
