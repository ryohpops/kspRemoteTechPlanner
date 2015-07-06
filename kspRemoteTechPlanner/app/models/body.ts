/// <reference path="../_references.ts" />

module App {
    'use strict';

    export class Body {
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

    export interface BodyJSON {
        name: string;
        color: string;
        radius: number;
        stdGravity: number;
        soi: number;
    }
}
