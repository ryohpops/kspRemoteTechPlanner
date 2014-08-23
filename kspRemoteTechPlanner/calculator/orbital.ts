module Orbital {
    export function orbitalPeriod(bodyRadius: number, altitude: number, stdGravParam: number) {
        return 2 * Math.PI * Math.sqrt(Math.pow(bodyRadius + altitude, 3) / stdGravParam);
    }

    export function orbitalNightTime(bodyRadius: number, altitude: number, stdGravParam: number) {
        var ra: number = bodyRadius + altitude;
        return 2 * Math.pow(ra, 2) / Math.sqrt(ra * stdGravParam) * Math.asin(bodyRadius / ra);
    }

    export function hohmannDeltav1(bodyRadius: number, altitude1: number, altitude2: number, stdGravParam: number) {
        var r1: number = bodyRadius + altitude1;
        var r2: number = bodyRadius + altitude2;
        return Math.sqrt(stdGravParam / r1) * (Math.sqrt((2 * r2) / (r1 + r2)) - 1);
    }

    export function hohmannDeltav2(bodyRadius: number, altitude1: number, altitude2: number, stdGravParam: number) {
        var r1: number = bodyRadius + altitude1;
        var r2: number = bodyRadius + altitude2;
        return Math.sqrt(stdGravParam / r2) * (1 - Math.sqrt((2 * r1) / (r1 + r2)));
    }

    export function slidePhaseAngle(slideDeg: number, periodLow: number, periodHigh: number) {
        return slideDeg / (1 - periodHigh / periodLow);
    }

}