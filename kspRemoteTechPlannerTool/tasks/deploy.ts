/// <reference path="../_references.ts" />

'use strict';

var gulp: gulp.Gulp = require("gulp");
var sequence: Function = require("run-sequence");
var minjs: IGulpPlugin = require("gulp-uglify");
var mincss: IGulpPlugin = require("gulp-minify-css");
var rimraf: Function = require("rimraf");

var sourceHTML: string = "../kspRemoteTechPlanner/**/*.html";
var sourceJS: string = "../kspRemoteTechPlanner/**/appOut.js";
var sourceCSS: string = "../kspRemoteTechPlanner/**/app.css";
var deployDir: string = "../deploy/";

gulp.task("deploy:clean",(cb: gulp.ITaskCallback) => {
    rimraf(deployDir, cb);
});

gulp.task("deploy:copy-html",() => {
    return gulp.src(sourceHTML)
        .pipe(gulp.dest(deployDir));
});

gulp.task("deploy:minify-js",() => {
    return gulp.src(sourceJS)
        .pipe(minjs())
        .pipe(gulp.dest(deployDir));
});

gulp.task("deploy:minify-css",() => {
    return gulp.src(sourceCSS)
        .pipe(mincss())
        .pipe(gulp.dest(deployDir));
});

gulp.task("deploy",(cb: gulp.ITaskCallback) => {
    sequence("deploy:clean", ["deploy:copy-html", "deploy:minify-js", "deploy:minify-css"], cb);
});
