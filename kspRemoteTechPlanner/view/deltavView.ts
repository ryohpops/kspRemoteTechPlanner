/// <reference path="../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../model/body.ts" />
/// <reference path="../model/satellites.ts" />
/// <reference path="../view/graphicshelper.ts" />
/// <reference path="../view/view.ts" />

class DeltavView extends View {
    private static bodyRadius: number = 20;
    private static parkingAltitude: number = 50;
    private static designatedAltitude: number = 150;

    body: Body;
    satellites: Satellites;

    shapeOuter: createjs.Shape;
    txtDV1: createjs.Text;
    txtDV2: createjs.Text;
    txtPhaseAngle: createjs.Text;
    txtPhaseTime: createjs.Text;

    constructor(stage: createjs.Stage, innerSize: number, outerSize: number) {
        super(stage, innerSize, outerSize);

        // shape for drawing in outer coordinates
        this.shapeOuter = new createjs.Shape();
        this.shapes.addChild(this.shapeOuter);
    }
} 