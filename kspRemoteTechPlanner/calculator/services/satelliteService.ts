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

        position(count: number, altitude: number): Point[] {
            var ret: Point[] = [];
            for (var offset = 0; offset < count; offset++)
                ret.push({ x: altitude * Math.cos(2 * Math.PI / count * offset), y: altitude * Math.sin(2 * Math.PI / count * offset) });
            return ret;
        }

        distance(count: number, altitude: number): number[] {
            var ret: number[] = [];
            var pos: Point[] = this.position(count, altitude);
            for (var offset = 0; offset < count; offset++)
                ret.push(this.euclideanServ.length(pos[0], pos[offset]));
            return ret;
        }

        connectability(radius: number, count: number, altitude: number, range: number): boolean[] {
            var ret: boolean[] = [];
            var pos: Point[] = this.position(count, altitude);
            for (var toSat = 0; toSat < count; toSat++)
                ret.push(this.distance(count, altitude)[toSat] <= range // connection range is enough 
                    && this.euclideanServ.distPointLine({ x: 0, y: 0 }, pos[0], pos[toSat]) > radius); // connection is not blocked by primary body
            return ret;
        }

        hasStableArea(radius: number, count: number, altitude: number, range: number): boolean {
            return count >= 3 && this.connectability(radius, count, altitude, range)[1]; // at least 3 satellites and a sat can connect to the next one
        }

        stableLimitAltitude(count: number, altitude: number, range: number): number {
            var pos: Point[] = this.position(count, altitude);
            return this.euclideanServ.circleCross({ x: 0, y: 0 }, pos[0], pos[1], range, CircleCrossMode.high);
        }

        private totalElcNeeded(satElc: number, antennaElc: number[], antennaQuantity: number[]): number {
            var ret: number = satElc;
            for (var index in antennaElc) {
                ret += antennaElc[index] * antennaQuantity[index];
            }
            return ret;
        }

        requiredBattery(satElc: number, antennaElc: number[], antennaQuantity: number[], radius: number, stdGravParam: number, altitude: number): number {
            return this.totalElcNeeded(satElc, antennaElc, antennaQuantity) * this.orbitalServ.nightTime(radius, altitude, stdGravParam);
        }

        requiredGenerator(satElc: number, antennaElc: number[], antennaQuantity: number[], radius: number, stdGravParam: number, altitude: number): number {
            var period: number = this.orbitalServ.period(altitude, stdGravParam);
            var night: number = this.orbitalServ.nightTime(radius, altitude, stdGravParam);
            return this.totalElcNeeded(satElc, antennaElc, antennaQuantity) * period / (period - night);
        }

        slidePhaseAngle(radius: number, stdGravParam: number, count: number, targetAltitude: number, parkingAltitude): number {
            var periodParking: number = this.orbitalServ.period(parkingAltitude, stdGravParam);
            var periodTarget: number = this.orbitalServ.period(targetAltitude, stdGravParam);
            return this.orbitalServ.slidePhaseAngle(360 / count, periodParking, periodTarget);
        }

        slidePhaseTime(radius: number, stdGravParam: number, count: number, targetAltitude: number, parkingAltitude): number {
            return this.slidePhaseAngle(radius, stdGravParam, count, targetAltitude, parkingAltitude) / 360 * this.orbitalServ.period(parkingAltitude, stdGravParam);
        }
    }
}
