/// <reference path="point.ts" />
var Euclidean;
(function (Euclidean) {
    (function (CircleCrossPointMode) {
        CircleCrossPointMode[CircleCrossPointMode["high"] = 0] = "high";
        CircleCrossPointMode[CircleCrossPointMode["low"] = 1] = "low";
    })(Euclidean.CircleCrossPointMode || (Euclidean.CircleCrossPointMode = {}));
    var CircleCrossPointMode = Euclidean.CircleCrossPointMode;

    function circleCrossPoint(origin, center1, center2, radius, mode) {
        var dist = length(center1, center2);
        var rad1 = Math.atan2(center2.y - center1.y, center2.x - center1.x);
        var rad2 = Math.acos(dist / (2 * radius));
        var cross1 = new Point(center1.x + radius * Math.cos(rad1 + rad2), center1.y + radius * Math.sin(rad1 + rad2));
        var cross2 = new Point(center1.x + radius * Math.cos(rad1 - rad2), center1.y + radius * Math.sin(rad1 - rad2));
        if (mode == 0 /* high */) {
            return length(origin, cross1) > length(origin, cross2) ? length(origin, cross1) : length(origin, cross2);
        } else if (mode == 1 /* low */) {
            return length(origin, cross1) < length(origin, cross2) ? length(origin, cross1) : length(origin, cross2);
        }
    }
    Euclidean.circleCrossPoint = circleCrossPoint;

    function length(p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
    Euclidean.length = length;

    // warning, this calculation is simplified for lmited use case
    function distanceBetweenPointAndLine(point, onLine1, onLine2) {
        var h = new Point(onLine1.x + (onLine2.x - onLine1.x) / 2, onLine1.y + (onLine2.y - onLine1.y) / 2);
        return length(point, h);
    }
    Euclidean.distanceBetweenPointAndLine = distanceBetweenPointAndLine;
})(Euclidean || (Euclidean = {}));
//# sourceMappingURL=euclidean.js.map
