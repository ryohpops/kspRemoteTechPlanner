/// <reference path="_references.ts" />

namespace Calculator.Orbital {
    'use strict';

    export function period(sma: number, stdGravParam: number): number {
        return 2 * Math.PI * Math.sqrt(Math.pow(sma, 3) / stdGravParam);
    }

    export function sma(stdGravParam: number, period: number): number {
        return Math.pow(Math.pow(period, 2) * stdGravParam / (4 * Math.pow(Math.PI, 2)), 1 / 3);
    }

    export function nightTime(radius: number, sma: number, stdGravParam: number): number {
        return period(sma, stdGravParam) * Math.asin(radius / sma) / Math.PI;
    }

    export function hohmannStartDV(sma1: number, sma2: number, stdGravParam: number): number {
        return Math.sqrt(stdGravParam / sma1) * (Math.sqrt((2 * sma2) / (sma1 + sma2)) - 1);
    }

    export function hohmannFinishDV(sma1: number, sma2: number, stdGravParam: number): number {
        return Math.sqrt(stdGravParam / sma2) * (1 - Math.sqrt((2 * sma1) / (sma1 + sma2)));
    }

    export function slidePhaseAngle(slideDeg: number, periodLow: number, periodHigh: number): number {
        return slideDeg / (1 - periodLow / periodHigh);
    }
}
