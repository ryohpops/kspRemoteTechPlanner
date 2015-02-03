/// <reference path="../references.ts" />

'use strict';

var gulp = require("gulp");
var sequence = require("run-sequence");
var connect = require("gulp-connect");
var shell = require("gulp-shell");

var targetRoot = "../kspRemoteTechPlanner/";
var targetConf = "../kspRemoteTechPlannerTest/conf.js";

gulp.task("wdm-update",
    shell.task("webdriver-manager update")
    );

gulp.task("server-start", function () {
    connect.server({
        root: targetRoot,
        port: 8080
    });
});

gulp.task("server-stop", function () {
    connect.serverClose();
});

gulp.task("protractor",
    shell.task("protractor " + targetConf, { ignoreErrors: true })
    );

gulp.task("test", function (cb) {
    sequence(["wdm-update", "server-start"], "protractor", "server-stop", cb);
});
