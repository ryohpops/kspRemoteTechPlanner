/// <reference path="body.ts" />
/// <reference path="antenna.ts" />
/// <reference path="point.ts" />

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
        return Calculator.length(this.satPosition(0, 0), this.satPosition(1, 0));
    }

    stableRange(): number {
        return Calculator.circleCrossPoint(new Point(0, 0), this.antenna.range,
            this.satPosition(0, 0), this.satPosition(1, 0), Calculator.CircleCrossPointMode.high);
    }

    orbitalPeriod(): number {
        return Calculator.orbitalPeriod(this.body.radius, this.altitude, this.body.stdGravParam);
    }

    nightTime(): number {
        return Calculator.orbitalNightTime(this.body.radius, this.altitude, this.body.stdGravParam);
    }

    requiredBattery(): number {
        return this.elcConsumption * this.nightTime();
    }

    requiredGenerator(): number {
        return this.elcConsumption * this.orbitalPeriod() / (this.orbitalPeriod() - this.nightTime())
    }
} 