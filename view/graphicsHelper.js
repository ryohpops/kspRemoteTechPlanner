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
        g.moveTo(x1, y1).lineTo(x2, y2);
        drawArrow(g, x1, y1, slope, arrowSize);
        drawArrow(g, x2, y2, slope + Math.PI, arrowSize);
        return g;
    }
    GraphicsHelper.drawDualArrow = drawDualArrow;
})(GraphicsHelper || (GraphicsHelper = {}));
