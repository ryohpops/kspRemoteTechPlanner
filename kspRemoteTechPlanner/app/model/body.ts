/// <reference path="../references.ts" />

class Body {
    'use strict';

    name: string;
    color: string;
    radius: number;
    stdGravParam: number;
    soi: number;

    constructor(name: string, color: string, radius: number, stdGravParam: number, soi: number) {
        this.name = name;
        this.color = color;
        this.radius = radius;
        this.stdGravParam = stdGravParam;
        this.soi = soi;
    }
} 