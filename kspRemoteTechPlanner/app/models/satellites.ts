/// <reference path="../appReferences.ts" />
module App {
    export class Satellites {
        'use strict';

        body: Body;
        count: number;
        altitude: number;
        elcConsumption: number;
        antenna: Antenna;
        parkingAltitude: number;

        constructor(body: Body, count: number, altitude: number, elcConsumption: number, antenna: Antenna, parkingAltitude: number) {
            this.body = body;
            this.count = count;
            this.altitude = altitude;
            this.elcConsumption = elcConsumption;
            this.antenna = antenna;
            this.parkingAltitude = parkingAltitude;
        }

        satPosition(offset: number): Calculator.Point {
            var ra: number = this.body.radius + this.altitude;
            return new Calculator.Point(ra * Math.cos(2 * Math.PI / this.count * offset), + ra * Math.sin(2 * Math.PI / this.count * offset));
        }

        satDistance(): number {
            return this.satDistanceTo(1);
        }

        satDistanceTo(distance: number): number {
            return Calculator.length(this.satPosition(0), this.satPosition(distance));
        }

        isNextSatConnectable(): boolean {
            return this.canConnectToSat(1);
        }

        canConnectToSat(distance: number): boolean {
            return this.count >= distance + 1 &&                                                                                            // connecting satellite exists
                Calculator.length(this.satPosition(0), this.satPosition(distance)) <= this.antenna.range &&                                  // connection range is enough 
                Calculator.distanceBetweenPointAndLine(new Calculator.Point(0, 0), this.satPosition(0), this.satPosition(distance)) > this.body.radius; // connection is not blocked by orbiting body
        }

        hasStableArea(): boolean {
            return this.count >= 3 && this.isNextSatConnectable(); // at least 3 satellites and they can connect to next one
        }

        stableLimitAltitude(): number {
            return Calculator.circleCrossPoint(new Calculator.Point(0, 0), this.satPosition(0), this.satPosition(1),
                this.antenna.range, Calculator.CircleCrossPointMode.high) - this.body.radius;
        }

        orbitalPeriod(): number {
            return Calculator.orbitalPeriod(this.body.radius, this.altitude, this.body.stdGravParam);
        }

        nightTime(): number {
            return Calculator.orbitalNightTime(this.body.radius, this.altitude, this.body.stdGravParam);
        }

        requiredBattery(): number {
            return (this.elcConsumption + this.antenna.elcConsumption) * this.nightTime();
        }

        requiredGenerator(): number {
        return (this.elcConsumption + this.antenna.elcConsumption) * this.orbitalPeriod() / (this.orbitalPeriod() - this.nightTime())
    }

        hohmannStartDeltaV(): number {
            return Calculator.hohmannStartDeltaV(this.body.radius, this.parkingAltitude, this.altitude, this.body.stdGravParam);
        }

        hohmannFinishDeltaV(): number {
            return Calculator.hohmannFinishDeltaV(this.body.radius, this.parkingAltitude, this.altitude, this.body.stdGravParam);
        }

        slidePhaseAngle(): number {
            var periodLow: number = Calculator.orbitalPeriod(this.body.radius, this.parkingAltitude, this.body.stdGravParam);
            var periodHigh: number = Calculator.orbitalPeriod(this.body.radius, this.altitude, this.body.stdGravParam);
            return Calculator.slidePhaseAngle(360 / this.count, periodLow, periodHigh);
        }

        slidePhaseTime(): number {
            return this.slidePhaseAngle() / 360 * Calculator.orbitalPeriod(this.body.radius, this.parkingAltitude, this.body.stdGravParam);
        }
    }
}
