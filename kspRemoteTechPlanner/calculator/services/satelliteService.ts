/// <reference path="../calculatorreferences.ts" />

module Calculator {
    export class SatelliteService {
        'use strict';

        static $inject = ["calc.euclideanServ", "calc.orbitalServ"]
        constructor(
            private euclideanServ: EuclideanService,
            private orbitalServ: OrbitalService
            ) {

        }

        position(count: number, sma: number): Point[] {
            var ret: Point[] = [];
            for (var offset = 0; offset < count; offset++)
                ret.push({ x: sma * Math.cos(2 * Math.PI / count * offset), y: sma * Math.sin(2 * Math.PI / count * offset) });
            return ret;
        }

        distance(count: number, sma: number): number[] {
            var ret: number[] = [];
            var pos: Point[] = this.position(count, sma);
            for (var offset = 0; offset < count; offset++)
                ret.push(this.euclideanServ.length(pos[0], pos[offset]));
            return ret;
        }

        connectability(radius: number, count: number, sma: number, range: number): boolean[] {
            var ret: boolean[] = [];
            var pos: Point[] = this.position(count, sma);
            for (var toSat = 0; toSat < count; toSat++)
                ret.push(this.distance(count, sma)[toSat] <= range // connection range is enough 
                    && this.euclideanServ.distPointLine({ x: 0, y: 0 }, pos[0], pos[toSat]) > radius); // connection is not blocked by primary body
            return ret;
        }

        hasStableArea(radius: number, count: number, sma: number, range: number): boolean {
            return count >= 3 && this.connectability(radius, count, sma, range)[1]; // at least 3 satellites and a sat can connect to the next one
        }

        stableLimitSma(count: number, sma: number, range: number): number {
            var pos: Point[] = this.position(count, sma);
            return this.euclideanServ.circleCross({ x: 0, y: 0 }, pos[0], pos[1], range, CircleCrossMode.high);
        }

        private totalElcNeeded(satElc: number, antennaElc: number[], antennaQuantity: number[]): number {
            var ret: number = satElc;
            for (var index in antennaElc) {
                ret += antennaElc[index] * antennaQuantity[index];
            }
            return ret;
        }

        requiredBattery(satElc: number, antennaElc: number[], antennaQuantity: number[], radius: number, stdGravParam: number, sma: number): number {
            return this.totalElcNeeded(satElc, antennaElc, antennaQuantity) * this.orbitalServ.nightTime(radius, sma, stdGravParam);
        }

        requiredGenerator(satElc: number, antennaElc: number[], antennaQuantity: number[], radius: number, stdGravParam: number, sma: number): number {
            var period: number = this.orbitalServ.period(sma, stdGravParam);
            var night: number = this.orbitalServ.nightTime(radius, sma, stdGravParam);
            return this.totalElcNeeded(satElc, antennaElc, antennaQuantity) * period / (period - night);
        }

        slidePhaseAngle(radius: number, stdGravParam: number, count: number, targetSma: number, parkingSma): number {
            var periodParking: number = this.orbitalServ.period(parkingSma, stdGravParam);
            var periodTarget: number = this.orbitalServ.period(targetSma, stdGravParam);
            return this.orbitalServ.slidePhaseAngle(360 / count, periodParking, periodTarget);
        }

        slidePhaseTime(radius: number, stdGravParam: number, count: number, targetSma: number, parkingSma): number {
            return this.slidePhaseAngle(radius, stdGravParam, count, targetSma, parkingSma) / 360 * this.orbitalServ.period(parkingSma, stdGravParam);
        }
    }
}
