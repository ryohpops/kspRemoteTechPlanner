'use strict';

var gulp = require("gulp");
var minjs = require("gulp-uglify");
var mincss = require("gulp-minify-css");
var run = require("gulp-run");
var connect = require("gulp-connect");
var rimraf = require("rimraf");

var deployDir = "deploy/";

gulp.task("wdm-update", function (cb) {
    run("webdriver-manager update").exec(cb);
});

gulp.task("server-start", function () {
    connect.server({
        root: "kspRemoteTechPlanner",
        port: 8080
    });
});

gulp.task("protractor", ["wdm-update", "server-start"], function (cb) {
    run("protractor kspRemoteTechPlanner/test/conf.js").exec(cb);
});

gulp.task("server-stop", ["protractor"], function () {
    connect.serverClose();
});

gulp.task("test", ["server-stop"], function () { });

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
