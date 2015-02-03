/// <reference path="../references.ts" />

'use strict';

var gulp = require("gulp");
var sequence = require("run-sequence");
var minjs = require("gulp-uglify");
var mincss = require("gulp-minify-css");
var rimraf = require("rimraf");

var sourceHTML = "../kspRemoteTechPlanner/**/*.html";
var sourceJS = "../kspRemoteTechPlanner/**/appOut.js";
var sourceCSS = "../kspRemoteTechPlanner/**/app.css";
var deployDir = "../deploy/";

gulp.task("clean", function (cb) {
    rimraf(deployDir, cb);
});

gulp.task("copy-html", function () {
    return gulp.src(sourceHTML)
        .pipe(gulp.dest(deployDir));
});

gulp.task("minify-js", function () {
    return gulp.src(sourceJS)
        .pipe(minjs())
        .pipe(gulp.dest(deployDir));
});

gulp.task("minify-css", function () {
    return gulp.src(sourceCSS)
        .pipe(mincss())
        .pipe(gulp.dest(deployDir));
});

gulp.task("deploy", function (cb) {
    sequence("clean", ["copy-html", "minify-js", "minify-css"], cb);
});
