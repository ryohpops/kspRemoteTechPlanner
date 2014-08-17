/// <reference path="../model/body.ts" />
/// <reference path="../model/satellites.ts" />
/// <reference path="point.ts" />
/// <reference path="euclidean.ts" />
var Communication;
(function (Communication) {
    function isNextSatConnectable(body, satellites, innerSize) {
        return satellites.count >= 2 && Euclidean.length(satellites.satPosition(0, innerSize), satellites.satPosition(1, innerSize)) <= satellites.antenna.range && Euclidean.distanceBetweenPointAndLine(new Point(innerSize / 2, innerSize / 2), satellites.satPosition(0, innerSize), satellites.satPosition(1, innerSize)) >= body.radius;
    }
    Communication.isNextSatConnectable = isNextSatConnectable;

    function hasStableArea(body, satellites, innerSize) {
        return satellites.count >= 3 && this.isNextSatConnectable(body, satellites, innerSize);
    }
    Communication.hasStableArea = hasStableArea;
})(Communication || (Communication = {}));
//# sourceMappingURL=communication.js.map
