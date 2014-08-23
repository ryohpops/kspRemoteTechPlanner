﻿/// <reference path="point.ts" />

module Euclidean {
    export enum CircleCrossPointMode {
        high, low
    }

    export function circleCrossPoint(origin: Point, center1: Point, center2: Point, radius: number, mode: CircleCrossPointMode): number {
        var dist: number = length(center1, center2);
        var rad1: number = Math.atan2(center2.y - center1.y, center2.x - center1.x);
        var rad2: number = Math.acos(dist / (2 * radius));
        var cross1: Point = new Point(center1.x + radius * Math.cos(rad1 + rad2), center1.y + radius * Math.sin(rad1 + rad2));
        var cross2: Point = new Point(center1.x + radius * Math.cos(rad1 - rad2), center1.y + radius * Math.sin(rad1 - rad2));
        if (mode == CircleCrossPointMode.high) {
            return length(origin, cross1) > length(origin, cross2) ? length(origin, cross1) : length(origin, cross2);
        } else if (mode == CircleCrossPointMode.low) {
            return length(origin, cross1) < length(origin, cross2) ? length(origin, cross1) : length(origin, cross2);
        }
    }

    export function length(p1: Point, p2: Point): number {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }

    // warning, this calculation is simplified for lmited use case
    export function distanceBetweenPointAndLine(point: Point, onLine1: Point, onLine2: Point): number {
        var h: Point = new Point(onLine1.x + (onLine2.x - onLine1.x) / 2, onLine1.y + (onLine2.y - onLine1.y) / 2);
        return length(point, h);
    }
}