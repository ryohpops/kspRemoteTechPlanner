/// <reference path="../calculatorreferences.ts" />

module Calculator {

    export class OrbitalService {
        'use strict';

        period(sma: number, stdGravParam: number): number {
            return 2 * Math.PI * Math.sqrt(Math.pow(sma, 3) / stdGravParam);
        }

        nightTime(radius: number, sma: number, stdGravParam: number): number {
            return this.period(sma, stdGravParam) * Math.asin(radius / sma) / Math.PI;
        }

        hohmannStartDV(sma1: number, sma2: number, stdGravParam: number): number {
            return Math.sqrt(stdGravParam / sma1) * (Math.sqrt((2 * sma2) / (sma1 + sma2)) - 1);
        }

        hohmannFinishDV(sma1: number, sma2: number, stdGravParam: number): number {
            return Math.sqrt(stdGravParam / sma2) * (1 - Math.sqrt((2 * sma1) / (sma1 + sma2)));
        }

        slidePhaseAngle(slideDeg: number, periodLow: number, periodHigh: number): number {
            return slideDeg / (1 - periodLow / periodHigh);
        }
    }
}
