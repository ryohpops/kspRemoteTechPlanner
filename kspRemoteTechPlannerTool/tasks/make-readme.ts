/// <reference path="../../kspremotetechplannertool/references.ts" />

'use strict';

var gulp: gulp.Gulp = require("gulp");
var sequence: Function = require("run-sequence");
var fs: any = require("fs");
var rl: any = require("readline");

var header: string = "documents/header.md";
var log: string = "documents/log.md";
