/// <reference path="_references.ts" />

module Calculator.Satellite {
    'use strict';

    import calcEuc = Calculator.Euclidean;
    import calcOrb = Calculator.Orbital;

    export function position(count: number, sma: number): Point[] {
        var ret: Point[] = [];
        for (var offset = 0; offset < count; offset++)
            ret.push({ x: sma * Math.cos(2 * Math.PI / count * offset), y: sma * Math.sin(2 * Math.PI / count * offset) });
        return ret;
    }

    export function distance(count: number, sma: number): number[] {
        var ret: number[] = [];
        var pos: Point[] = Satellite.position(count, sma);
        for (var offset = 0; offset < count; offset++)
            ret.push(calcEuc.length(pos[0], pos[offset]));
        return ret;
    }

    export function connectability(radius: number, count: number, sma: number, range: number): boolean[] {
        var ret: boolean[] = [];
        var pos: Point[] = Satellite.position(count, sma);
        for (var toSat = 0; toSat < count; toSat++)
            ret.push(Satellite.distance(count, sma)[toSat] <= range // connection range is enough 
                && calcEuc.distPointLine({ x: 0, y: 0 }, pos[0], pos[toSat]) > radius); // connection is not blocked by primary body
        return ret;
    }

    export function hasStableArea(radius: number, count: number, sma: number, range: number): boolean {
        return count >= 3 && Satellite.connectability(radius, count, sma, range)[1]; // at least 3 satellites and a sat can connect to the next one
    }

    export function stableLimitSma(count: number, sma: number, range: number): number {
        var pos: Point[] = Satellite.position(count, sma);
        return calcEuc.circleCross({ x: 0, y: 0 }, pos[0], pos[1], range, calcEuc.CircleCrossMode.high);
    }

    function totalElcNeeded(satElc: number, antennaElc: number[], antennaQuantity: number[]): number {
        var ret: number = satElc;
        for (var index in antennaElc) {
            ret += antennaElc[index] * antennaQuantity[index];
        }
        return ret;
    }

    export function requiredBattery(satElc: number, antennaElc: number[], antennaQuantity: number[], radius: number, stdGravParam: number, sma: number): number {
        return totalElcNeeded(satElc, antennaElc, antennaQuantity) * calcOrb.nightTime(radius, sma, stdGravParam);
    }

    export function requiredGenerator(satElc: number, antennaElc: number[], antennaQuantity: number[], radius: number, stdGravParam: number, sma: number): number {
        var period: number = calcOrb.period(sma, stdGravParam);
        var night: number = calcOrb.nightTime(radius, sma, stdGravParam);
        return totalElcNeeded(satElc, antennaElc, antennaQuantity) * period / (period - night);
    }

    export function slidePhaseAngle(radius: number, stdGravParam: number, count: number, targetSma: number, parkingSma): number {
        var periodParking: number = calcOrb.period(parkingSma, stdGravParam);
        var periodTarget: number = calcOrb.period(targetSma, stdGravParam);
        return calcOrb.slidePhaseAngle(360 / count, periodParking, periodTarget);
    }

    export function slidePhaseTime(radius: number, stdGravParam: number, count: number, targetSma: number, parkingSma): number {
        return Satellite.slidePhaseAngle(radius, stdGravParam, count, targetSma, parkingSma) / 360 * calcOrb.period(parkingSma, stdGravParam);
    }
}
