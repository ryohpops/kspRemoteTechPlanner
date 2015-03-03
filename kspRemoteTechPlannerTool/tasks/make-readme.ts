/// <reference path="../_references.ts" />

'use strict';

import gulp = require("gulp");
var sequence: Function = require("run-sequence");
import fs = require("fs");
import os = require("os");
import path = require("path");
import rename = require("gulp-rename");

var header: string = "../docs/header.md";
var changeLog: string = "../docs/changelog.md";
var dest: string = "../README.md";

gulp.task("make-readme:copy-header",() => {
    return gulp.src(path.normalize(header))
        .pipe(rename(path.basename(dest)))
        .pipe(gulp.dest(path.dirname(dest)));
});

gulp.task("make-readme:append-last-change",(cb: gulp.ITaskCallback) => {
    var log: string[] = fs.readFileSync(path.normalize(changeLog), "utf8").split(os.EOL + "-");
    fs.appendFile(path.normalize(dest), os.EOL + log[0], cb);
});

gulp.task("make-readme",(cb: gulp.ITaskCallback) => {
    sequence("make-readme:copy-header", "make-readme:append-last-change", cb);
});
