/// <reference path="../calculatorreferences.ts" />

module Calculator {

    export enum CircleCrossMode {
        high, low
    }

    export class EuclideanService {
        'use strict';

        circleCross(origin: Point, center1: Point, center2: Point, radius: number, mode: CircleCrossMode): number {
            var dist: number = this.length(center1, center2);
            var rad1: number = Math.atan2(center2.y - center1.y, center2.x - center1.x);
            var rad2: number = Math.acos(dist / (2 * radius));
            var cross1: Point = { x: center1.x + radius * Math.cos(rad1 + rad2), y: center1.y + radius * Math.sin(rad1 + rad2) };
            var cross2: Point = { x: center1.x + radius * Math.cos(rad1 - rad2), y: center1.y + radius * Math.sin(rad1 - rad2) };
            if (mode == CircleCrossMode.high) {
                return this.length(origin, cross1) > this.length(origin, cross2) ? this.length(origin, cross1) : this.length(origin, cross2);
            } else if (mode == CircleCrossMode.low) {
                return this.length(origin, cross1) < this.length(origin, cross2) ? this.length(origin, cross1) : this.length(origin, cross2);
            }
        }

        length(p1: Point, p2: Point): number {
            return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        }

        // warning, this calculation is only valid if a point is equidistant from the ends of a line
        distPointLine(point: Point, lineEnd1: Point, lineEnd2: Point): number {
            var h: Point = { x: lineEnd1.x + (lineEnd2.x - lineEnd1.x) / 2, y: lineEnd1.y + (lineEnd2.y - lineEnd1.y) / 2 };
            return this.length(point, h);
        }
    }
}
