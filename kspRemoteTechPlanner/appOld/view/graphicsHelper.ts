/// <reference path="../references.ts" />

module GraphicsHelper {
    'use strict';

    var arrowAngle: number = Math.PI / 6;

    export function drawArrow(g: createjs.Graphics, x: number, y: number, directionRad: number, arrowSize: number): createjs.Graphics {
        g.moveTo(x, y)
            .lineTo(x + arrowSize * Math.cos(directionRad + arrowAngle), y + arrowSize * Math.sin(directionRad + arrowAngle))
            .lineTo(x + arrowSize * Math.cos(directionRad - arrowAngle), y + arrowSize * Math.sin(directionRad - arrowAngle))
            .lineTo(x, y)
        return g;
    }

    export function drawDualArrow(g: createjs.Graphics, x1: number, y1: number, x2: number, y2: number, arrowSize: number): createjs.Graphics {
        var slope: number = Math.atan2(y2 - y1, x2 - x1);
        g.moveTo(x1, y1)
            .lineTo(x2, y2)
        drawArrow(g, x1, y1, slope, arrowSize)
        drawArrow(g, x2, y2, slope + Math.PI, arrowSize)
        return g;

    }
}