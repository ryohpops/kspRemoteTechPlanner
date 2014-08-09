/// <reference path="body.ts" />
/// <reference path="calculator.ts" />
/// <reference path="point.ts" />
/// <reference path="satellites.ts" />
var Communicator;
(function (Communicator) {
    function isNextSatConnectable(body, satellites, innerSize) {
        return satellites.count >= 2 && Calculator.length(satellites.satPosition(0, innerSize), satellites.satPosition(1, innerSize)) <= satellites.range && Calculator.distanceBetweenPointAndLine(new Point(innerSize / 2, innerSize / 2), satellites.satPosition(0, innerSize), satellites.satPosition(1, innerSize)) >= body.radius;
    }
    Communicator.isNextSatConnectable = isNextSatConnectable;

    function hasStableArea(body, satellites, innerSize) {
        return satellites.count >= 3 && this.isNextSatConnectable(body, satellites, innerSize);
    }
    Communicator.hasStableArea = hasStableArea;
})(Communicator || (Communicator = {}));
//# sourceMappingURL=communicator.js.map
