/// <reference path="../appreferences.ts" />

module App {
    export class Body {
        'use strict';

        name: string;
        color: string;
        radius: number;
        stdGravity: number;
        soi: number;

        constructor(name: string, color: string, radius: number, stdGravity: number, soi: number) {
            this.name = name;
            this.color = color;
            this.radius = radius;
            this.stdGravity = stdGravity;
            this.soi = soi;
        }

        clone(): Body {
            return new Body(this.name, this.color, this.radius, this.stdGravity, this.soi);
        }
    }
}
