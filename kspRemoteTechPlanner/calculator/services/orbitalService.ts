/// <reference path="../calculatorreferences.ts" />

module Calculator {

    export class OrbitalService {
        'use strict';

        period(altitude: number, stdGravParam: number) {
            return 2 * Math.PI * Math.sqrt(Math.pow(altitude, 3) / stdGravParam);
        }

        nightTime(radius: number, altitude: number, stdGravParam: number) {
            return this.period(altitude, stdGravParam) * Math.asin((radius / 2) / altitude) / Math.PI;
        }

        hohmannStartDV(radius: number, altitude1: number, altitude2: number, stdGravParam: number) {
            return Math.sqrt(stdGravParam / altitude1) * (Math.sqrt((2 * altitude2) / (altitude1 + altitude2)) - 1);
        }

        hohmannFinishDV(radius: number, altitude1: number, altitude2: number, stdGravParam: number) {
            return Math.sqrt(stdGravParam / altitude2) * (1 - Math.sqrt((2 * altitude1) / (altitude1 + altitude2)));
        }

        slidePhaseAngle(slideDeg: number, periodLow: number, periodHigh: number) {
            return slideDeg / (1 - periodLow / periodHigh);
        }
    }
}
