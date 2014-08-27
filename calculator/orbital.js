var Orbital;
(function (Orbital) {
    function orbitalPeriod(bodyRadius, altitude, stdGravParam) {
        return 2 * Math.PI * Math.sqrt(Math.pow(bodyRadius + altitude, 3) / stdGravParam);
    }
    Orbital.orbitalPeriod = orbitalPeriod;

    function orbitalNightTime(bodyRadius, altitude, stdGravParam) {
        var ra = bodyRadius + altitude;
        return 2 * Math.pow(ra, 2) / Math.sqrt(ra * stdGravParam) * Math.asin(bodyRadius / ra);
    }
    Orbital.orbitalNightTime = orbitalNightTime;

    function hohmannStartDeltaV(bodyRadius, altitude1, altitude2, stdGravParam) {
        var r1 = bodyRadius + altitude1;
        var r2 = bodyRadius + altitude2;
        return Math.sqrt(stdGravParam / r1) * (Math.sqrt((2 * r2) / (r1 + r2)) - 1);
    }
    Orbital.hohmannStartDeltaV = hohmannStartDeltaV;

    function hohmannFinishDeltaV(bodyRadius, altitude1, altitude2, stdGravParam) {
        var r1 = bodyRadius + altitude1;
        var r2 = bodyRadius + altitude2;
        return Math.sqrt(stdGravParam / r2) * (1 - Math.sqrt((2 * r1) / (r1 + r2)));
    }
    Orbital.hohmannFinishDeltaV = hohmannFinishDeltaV;

    function slidePhaseAngle(slideDeg, periodLow, periodHigh) {
        return slideDeg / (1 - periodLow / periodHigh);
    }
    Orbital.slidePhaseAngle = slidePhaseAngle;
})(Orbital || (Orbital = {}));
