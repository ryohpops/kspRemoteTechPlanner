/// <reference path="_references.ts" />

'use strict';

import gulp = require("gulp");
var sequence: Function = require("run-sequence");

var requireDir = require("require-dir");
var tasks = requireDir("tasks/");

gulp.task("deploy-with-readme",(cb: gulp.ITaskCallback) => {
    sequence("make-readme", "deploy", cb);
});
