/// <reference path="_references.ts" />

module Calculator.Euclidean {
    'use strict';

    export enum CircleCrossMode {
        high, low
    }

    export function circleCross(origin: Point, center1: Point, center2: Point, radius: number, mode: CircleCrossMode): number {
        var dist: number = Euclidean.length(center1, center2);
        var rad1: number = Math.atan2(center2.y - center1.y, center2.x - center1.x);
        var rad2: number = Math.acos(dist / (2 * radius));
        var cross1: Point = { x: center1.x + radius * Math.cos(rad1 + rad2), y: center1.y + radius * Math.sin(rad1 + rad2) };
        var cross2: Point = { x: center1.x + radius * Math.cos(rad1 - rad2), y: center1.y + radius * Math.sin(rad1 - rad2) };

        var length1: number = Euclidean.length(origin, cross1);
        var length2: number = Euclidean.length(origin, cross2);
        if (mode == CircleCrossMode.high) {
            return length1 > length2 ? length1 : length2;
        } else if (mode == CircleCrossMode.low) {
            return length1 < length2 ? length1 : length2;
        }
    }

    export function length(p1: Point, p2: Point): number {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }

    // warning, this calculation is only valid if a point is equidistant from the ends of a line
    export function distPointLine(point: Point, lineEnd1: Point, lineEnd2: Point): number {
        var h: Point = { x: lineEnd1.x + (lineEnd2.x - lineEnd1.x) / 2, y: lineEnd1.y + (lineEnd2.y - lineEnd1.y) / 2 };
        return Euclidean.length(point, h);
    }
}
