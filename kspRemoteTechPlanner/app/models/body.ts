/// <reference path="../appreferences.ts" />
module App {
    export class Body {
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

        clone(): Body {
            return new Body(this.name, this.color, this.radius, this.stdGravParam, this.soi);
        }
    }
}
