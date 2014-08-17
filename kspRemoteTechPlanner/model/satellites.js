/// <reference path="body.ts" />
/// <reference path="antenna.ts" />
/// <reference path="point.ts" />
var Satellites = (function () {
    function Satellites() {
    }
    Satellites.prototype.satPosition = function (offset, innerSize, count, altitude) {
        if (typeof count === "undefined") { count = this.count; }
        if (typeof altitude === "undefined") { altitude = this.altitude + this.body.radius; }
        return new Point(innerSize / 2 + altitude * Math.cos(2 * Math.PI / count * offset), innerSize / 2 + altitude * Math.sin(2 * Math.PI / count * offset));
    };

    Satellites.prototype.satDistance = function () {
        return Calculator.length(this.satPosition(0, 0), this.satPosition(1, 0));
    };

    Satellites.prototype.stableRange = function () {
        return Calculator.circleCrossPoint(new Point(0, 0), this.antenna.range, this.satPosition(0, 0), this.satPosition(1, 0), 0 /* high */) - this.body.radius;
    };

    Satellites.prototype.orbitalPeriod = function () {
        return Calculator.orbitalPeriod(this.body.radius, this.altitude, this.body.stdGravParam);
    };

    Satellites.prototype.nightTime = function () {
        return Calculator.orbitalNightTime(this.body.radius, this.altitude, this.body.stdGravParam);
    };

    Satellites.prototype.requiredBattery = function () {
        return (this.elcConsumption + this.antenna.elcConsumption) * this.nightTime();
    };

    Satellites.prototype.requiredGenerator = function () {
        return (this.elcConsumption + this.antenna.elcConsumption) * this.orbitalPeriod() / (this.orbitalPeriod() - this.nightTime());
    };
    return Satellites;
})();
//# sourceMappingURL=satellites.js.map
