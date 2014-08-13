/// <reference path="../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../scripts/typings/tweenjs/tweenjs.d.ts" />

module GraphicsHelper {
    var arrowAngle: number = Math.PI / 6;

    export function drawDualArrow(g: createjs.Graphics, x1: number, y1: number, x2: number, y2: number, arrowSize: number): createjs.Graphics {
        var slope: number = Math.atan2(y2 - y1, x2 - x1);
        g.moveTo(x1, y1)
            .lineTo(x2, y2)
            .moveTo(x1, y1)
            .lineTo(x1 + arrowSize * Math.cos(slope + arrowAngle), y1 + arrowSize * Math.sin(slope + arrowAngle))
            .lineTo(x1 + arrowSize * Math.cos(slope - arrowAngle), y1 + arrowSize * Math.sin(slope - arrowAngle))
            .lineTo(x1, y1)
            .moveTo(x2, y2)
            .lineTo(x2 + -arrowSize * Math.cos(slope + arrowAngle), y2 + -arrowSize * Math.sin(slope + arrowAngle))
            .lineTo(x2 + -arrowSize * Math.cos(slope - arrowAngle), y2 + -arrowSize * Math.sin(slope - arrowAngle))
            .lineTo(x2, y2)
        return g;
    }
}