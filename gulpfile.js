'use strict';

var gulp = require("gulp");
var minjs = require("gulp-uglify");
var mincss = require("gulp-minify-css");
var rimraf = require("rimraf");

var deployDir = "deploy/";

gulp.task("clean", function (cb) {
    rimraf(deployDir, cb);
});

gulp.task("copy-html", ["clean"], function () {
    return gulp.src("kspRemoteTechPlanner/**/*.html")
    .pipe(gulp.dest(deployDir));
});

gulp.task("minify-js", ["clean"], function () {
    return gulp.src("kspRemoteTechPlanner/**/appOut.js")
    .pipe(minjs())
    .pipe(gulp.dest(deployDir));
});

gulp.task("minify-css", ["clean"], function () {
    return gulp.src("kspRemoteTechPlanner/**/app.css")
    .pipe(mincss())
    .pipe(gulp.dest(deployDir));
});

gulp.task("deploy", ["copy-html", "minify-js", "minify-css"], function () { });
