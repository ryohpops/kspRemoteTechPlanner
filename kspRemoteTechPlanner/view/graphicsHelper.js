/// <reference path="../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../scripts/typings/tweenjs/tweenjs.d.ts" />
var GraphicsHelper;
(function (GraphicsHelper) {
    var arrowAngle = Math.PI / 6;

    function drawArrow(g, x, y, directionRad, arrowSize) {
        g.moveTo(x, y).lineTo(x + arrowSize * Math.cos(directionRad + arrowAngle), y + arrowSize * Math.sin(directionRad + arrowAngle)).lineTo(x + arrowSize * Math.cos(directionRad - arrowAngle), y + arrowSize * Math.sin(directionRad - arrowAngle)).lineTo(x, y);
        return g;
    }
    GraphicsHelper.drawArrow = drawArrow;

    function drawDualArrow(g, x1, y1, x2, y2, arrowSize) {
        var slope = Math.atan2(y2 - y1, x2 - x1);
        g.moveTo(x1, y1).lineTo(x2, y2).moveTo(x1, y1).lineTo(x1 + arrowSize * Math.cos(slope + arrowAngle), y1 + arrowSize * Math.sin(slope + arrowAngle)).lineTo(x1 + arrowSize * Math.cos(slope - arrowAngle), y1 + arrowSize * Math.sin(slope - arrowAngle)).lineTo(x1, y1).moveTo(x2, y2).lineTo(x2 + -arrowSize * Math.cos(slope + arrowAngle), y2 + -arrowSize * Math.sin(slope + arrowAngle)).lineTo(x2 + -arrowSize * Math.cos(slope - arrowAngle), y2 + -arrowSize * Math.sin(slope - arrowAngle)).lineTo(x2, y2);
        return g;
    }
    GraphicsHelper.drawDualArrow = drawDualArrow;
})(GraphicsHelper || (GraphicsHelper = {}));
//# sourceMappingURL=graphicshelper.js.map
