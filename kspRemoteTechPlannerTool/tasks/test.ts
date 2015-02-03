/// <reference path="../references.ts" />

'use strict';

var gulp: gulp.Gulp = require("gulp");
var sequence: Function = require("run-sequence");
var connect: any = require("gulp-connect");
var shell: any = require("gulp-shell");

var targetRoot: string = "../kspRemoteTechPlanner/";
var targetConf: string = "../kspRemoteTechPlannerTest/conf.js";

gulp.task("test:wdm-update",
    shell.task("webdriver-manager update")
    );

gulp.task("test:server-start",() => {
    connect.server({
        root: targetRoot,
        port: 8080
    });
});

gulp.task("test:server-stop",() => {
    connect.serverClose();
});

gulp.task("test:protractor",
    shell.task("protractor " + targetConf, { ignoreErrors: true })
    );

gulp.task("test",(cb) => {
    sequence(["test:wdm-update", "test:server-start"], "test:protractor", "test:server-stop", cb);
});
