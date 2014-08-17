/// <reference path="../calculator/point.ts" />
/// <reference path="body.ts" />
/// <reference path="antenna.ts" />

class Satellites {
    body: Body;
    antenna: Antenna;
    count: number;
    altitude: number;
    elcConsumption: number;

    satPosition(offset: number, innerSize: number, count: number= this.count,
        altitude: number= this.altitude + this.body.radius): Point {
        return new Point(innerSize / 2 + altitude * Math.cos(2 * Math.PI / count * offset),
            innerSize / 2 + altitude * Math.sin(2 * Math.PI / count * offset));
    }

    satDistance(): number {
        return Euclidean.length(this.satPosition(0, 0), this.satPosition(1, 0));
    }

    stableRange(): number {
        return Euclidean.circleCrossPoint(new Point(0, 0), this.antenna.range,
            this.satPosition(0, 0), this.satPosition(1, 0), Euclidean.CircleCrossPointMode.high) - this.body.radius;
    }

    orbitalPeriod(): number {
        return Euclidean.orbitalPeriod(this.body.radius, this.altitude, this.body.stdGravParam);
    }

    nightTime(): number {
        return Euclidean.orbitalNightTime(this.body.radius, this.altitude, this.body.stdGravParam);
    }

    requiredBattery(): number {
        return (this.elcConsumption + this.antenna.elcConsumption) * this.nightTime();
    }

    requiredGenerator(): number {
        return (this.elcConsumption + this.antenna.elcConsumption) * this.orbitalPeriod() / (this.orbitalPeriod() - this.nightTime())
    }
} 