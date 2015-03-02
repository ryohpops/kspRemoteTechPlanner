/// <reference path="../_references.ts" />

'use strict';

import gulp = require("gulp");
var sequence: Function = require("run-sequence");
import fs = require("fs");
import path = require("path");
import rename = require("gulp-rename");

var header: string = "doc/header.md";
var changeLog: string = "doc/changelog.md";
var dest: string = "../READMEtest.md";

gulp.task("make-readme:copy-header",() => {
    return gulp.src(path.normalize(header))
        .pipe(rename(path.basename(dest)))
        .pipe(gulp.dest(path.dirname(dest)));
});
