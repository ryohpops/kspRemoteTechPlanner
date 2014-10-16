/// <reference path="../calculator/point.ts" />
/// <reference path="../calculator/euclidean.ts" />
/// <reference path="../calculator/orbital.ts" />
/// <reference path="body.ts" />
/// <reference path="antenna.ts" />
var Satellites = (function () {
    function Satellites() {
    }
    Satellites.prototype.satPosition = function (offset) {
        var ra = this.body.radius + this.altitude;
        return new Point(ra * Math.cos(2 * Math.PI / this.count * offset), +ra * Math.sin(2 * Math.PI / this.count * offset));
    };

    Satellites.prototype.satDistance = function () {
        return this.satDistanceTo(1);
    };

    Satellites.prototype.satDistanceTo = function (distance) {
        return Euclidean.length(this.satPosition(0), this.satPosition(distance));
    };

    Satellites.prototype.isNextSatConnectable = function () {
        return this.canConnectToSat(1);
    };

    Satellites.prototype.canConnectToSat = function (distance) {
        return this.count >= distance + 1 && Euclidean.length(this.satPosition(0), this.satPosition(distance)) <= this.antenna.range && Euclidean.distanceBetweenPointAndLine(new Point(0, 0), this.satPosition(0), this.satPosition(distance)) > this.body.radius;
    };

    Satellites.prototype.hasStableArea = function () {
        return this.count >= 3 && this.isNextSatConnectable();
    };

    Satellites.prototype.stableLimitAltitude = function () {
        return Euclidean.circleCrossPoint(new Point(0, 0), this.satPosition(0), this.satPosition(1), this.antenna.range, 0 /* high */) - this.body.radius;
    };

    Satellites.prototype.orbitalPeriod = function () {
        return Orbital.orbitalPeriod(this.body.radius, this.altitude, this.body.stdGravParam);
    };

    Satellites.prototype.nightTime = function () {
        return Orbital.orbitalNightTime(this.body.radius, this.altitude, this.body.stdGravParam);
    };

    Satellites.prototype.requiredBattery = function () {
        return (this.elcConsumption + this.antenna.elcConsumption) * this.nightTime();
    };

    Satellites.prototype.requiredGenerator = function () {
        return (this.elcConsumption + this.antenna.elcConsumption) * this.orbitalPeriod() / (this.orbitalPeriod() - this.nightTime());
    };

    Satellites.prototype.hohmannStartDeltaV = function () {
        return Orbital.hohmannStartDeltaV(this.body.radius, this.parkingAltitude, this.altitude, this.body.stdGravParam);
    };

    Satellites.prototype.hohmannFinishDeltaV = function () {
        return Orbital.hohmannFinishDeltaV(this.body.radius, this.parkingAltitude, this.altitude, this.body.stdGravParam);
    };

    Satellites.prototype.slidePhaseAngle = function () {
        var periodLow = Orbital.orbitalPeriod(this.body.radius, this.parkingAltitude, this.body.stdGravParam);
        var periodHigh = Orbital.orbitalPeriod(this.body.radius, this.altitude, this.body.stdGravParam);
        return Orbital.slidePhaseAngle(360 / this.count, periodLow, periodHigh);
    };

    Satellites.prototype.slidePhaseTime = function () {
        return this.slidePhaseAngle() / 360 * Orbital.orbitalPeriod(this.body.radius, this.parkingAltitude, this.body.stdGravParam);
    };
    return Satellites;
})();
//# sourceMappingURL=satellites.js.map
