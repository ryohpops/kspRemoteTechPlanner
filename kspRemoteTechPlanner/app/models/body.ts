/// <reference path="../_references.ts" />

module App {
    export class Body {
        'use strict';

        name: string;
        color: string;
        radius: number;
        stdGravity: number;
        soi: number;

        constructor(name: string, color: string, radius: number, stdGravity: number, soi: number);
        constructor(body: any);
        constructor(data: any, color?: string, radius?: number, stdGravity?: number, soi?: number) {
            if (color) {
                this.name = data;
                this.color = color;
                this.radius = radius;
                this.stdGravity = stdGravity;
                this.soi = soi;
            } else {
                this.name = data.name;
                this.color = data.color;
                this.radius = data.radius;
                this.stdGravity = data.stdGravity;
                this.soi = data.soi;
            }
        }

        clone(): Body {
            return new Body(this);
        }
    }
}
