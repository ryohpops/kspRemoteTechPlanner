/// <reference path="../calculator/point.ts" />
/// <reference path="../calculator/euclidean.ts" />
/// <reference path="../calculator/orbital.ts" />
/// <reference path="body.ts" />
/// <reference path="antenna.ts" />

class Satellites {
    body: Body;
    antenna: Antenna;
    count: number;
    altitude: number;
    elcConsumption: number;
    parkingAltitude: number;

    satPosition(offset: number): Point {
        var ra: number = this.body.radius + this.altitude;
        return new Point(ra * Math.cos(2 * Math.PI / this.count * offset), + ra * Math.sin(2 * Math.PI / this.count * offset));
    }

    satDistance(): number {
        return Euclidean.length(this.satPosition(0), this.satPosition(1));
    }

    isNextSatConnectable(): boolean {
        return this.count >= 2 &&                                                                                                // at least 2 satellites needed
            Euclidean.length(this.satPosition(0), this.satPosition(1)) <= this.antenna.range &&                                  // connection range is enough 
            Euclidean.distanceBetweenPointAndLine(new Point(0, 0), this.satPosition(0), this.satPosition(1)) > this.body.radius; // connection is not blocked by orbiting body
    }

    hasStableArea(): boolean {
        return this.count >= 3 && this.isNextSatConnectable(); // at least 3 satellites and they can connect to next one
    }

    stableLimitAltitude(): number {
        return Euclidean.circleCrossPoint(new Point(0, 0), this.satPosition(0), this.satPosition(1),
            this.antenna.range, Euclidean.CircleCrossPointMode.high) - this.body.radius;
    }

    orbitalPeriod(): number {
        return Orbital.orbitalPeriod(this.body.radius, this.altitude, this.body.stdGravParam);
    }

    nightTime(): number {
        return Orbital.orbitalNightTime(this.body.radius, this.altitude, this.body.stdGravParam);
    }

    requiredBattery(): number {
        return (this.elcConsumption + this.antenna.elcConsumption) * this.nightTime();
    }

    requiredGenerator(): number {
        return (this.elcConsumption + this.antenna.elcConsumption) * this.orbitalPeriod() / (this.orbitalPeriod() - this.nightTime())
    }

    hohmannStartDeltaV(): number {
        return Orbital.hohmannStartDeltaV(this.body.radius, this.parkingAltitude, this.altitude, this.body.stdGravParam);
    }

    hohmannFinishDeltaV(): number {
        return Orbital.hohmannFinishDeltaV(this.body.radius, this.parkingAltitude, this.altitude, this.body.stdGravParam);
    }

    slidePhaseAngle(): number {
        var periodLow: number = Orbital.orbitalPeriod(this.body.radius, this.parkingAltitude, this.body.stdGravParam);
        var periodHigh: number = Orbital.orbitalPeriod(this.body.radius, this.altitude, this.body.stdGravParam);
        return Orbital.slidePhaseAngle(360 / this.count, periodLow, periodHigh);
    }

    slidePhaseTime(): number {
        return this.slidePhaseAngle() / 360 * Orbital.orbitalPeriod(this.body.radius, this.parkingAltitude, this.body.stdGravParam);
    }
} 