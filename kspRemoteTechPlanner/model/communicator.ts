/// <reference path="body.ts" />
/// <reference path="calculator.ts" />
/// <reference path="point.ts" />
/// <reference path="satellites.ts" />

module Communicator {
    export function isNextSatConnectable(body: Body, satellites: Satellites, innerSize: number): boolean {
        return satellites.count >= 2 &&                                                                                             // at least 2 satellites needed
            Calculator.length(satellites.satPosition(0, innerSize), satellites.satPosition(1, innerSize)) <= satellites.range &&    // connection is not blocked by orbiting body
            Calculator.distanceBetweenPointAndLine(new Point(innerSize / 2, innerSize / 2),
                satellites.satPosition(0, innerSize), satellites.satPosition(1, innerSize)) >= body.radius;                         // connection range is enough
    }

    export function hasStableArea(body: Body, satellites: Satellites, innerSize: number): boolean {
        return satellites.count >= 3 && this.isNextSatConnectable(body, satellites, innerSize); // at least 3 satellites and they can connect to next one
    }
} 