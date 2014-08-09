/// <reference path="body.ts" />
/// <reference path="point.ts" />

class Satellites {
    body: Body;
    count: number;
    altitude: number;
    range: number;

    satPosition(offset: number, innerSize: number, count: number= this.count,
        altitude: number= this.altitude + this.body.radius): Point {
        return new Point(innerSize / 2 + altitude * Math.cos(2 * Math.PI / count * offset),
            innerSize / 2 + altitude * Math.sin(2 * Math.PI / count * offset));
    }

    satDistance(): number {
        return Calculator.length(this.satPosition(0, 0), this.satPosition(1, 0));
    }

    stableRange(): number {
        return Calculator.circleCrossPoint(new Point(0, 0), this.range,
            this.satPosition(0, 0), this.satPosition(1, 0), Calculator.CircleCrossPointMode.high);
    }
} 