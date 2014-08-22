/// <reference path="../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../model/body.ts" />
/// <reference path="../model/satellites.ts" />
/// <reference path="../calculator/point.ts" />
/// <reference path="../view/graphicshelper.ts" />
/// <reference path="../view/view.ts" />

class DeltavView extends View {
    private static bodyRadius: number = 20;
    private static parkingAltitude: number = 50;
    private static designatedAltitude: number = 150;
    private static neighborSatInterval: number = Math.PI / 3;

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

    show(): void {
        this.shapeOuter.graphics.clear();
        this.shapeOuter.graphics.setStrokeStyle(0.8);

        // body
        this.shapeOuter.graphics.beginFill(this.body.color)
            .drawCircle(this.outerCenter.x, this.outerCenter.y, DeltavView.bodyRadius)
            .endFill();

        // parking orbit
        this.shapeOuter.graphics.beginStroke("black")
            .drawCircle(this.outerCenter.x, this.outerCenter.y, DeltavView.parkingAltitude)
            .endStroke();

        // designated orbit
        this.shapeOuter.graphics.beginStroke("black")
            .drawCircle(this.outerCenter.x, this.outerCenter.y, DeltavView.designatedAltitude)
            .endStroke();

        // hohmann transfer trajectory
        this.shapeOuter.graphics.beginStroke("green")
            .arc(this.outerCenter.x + (DeltavView.parkingAltitude - DeltavView.designatedAltitude) / 2, this.outerCenter.y,
            (DeltavView.parkingAltitude + DeltavView.designatedAltitude) / 2, 0, Math.PI, true)
            .endStroke();
        this.shapeOuter.graphics.beginStroke("green")
        GraphicsHelper.drawArrow(this.shapeOuter.graphics, this.outerCenter.x + (DeltavView.parkingAltitude - DeltavView.designatedAltitude) / 2,
            this.outerCenter.y - (DeltavView.parkingAltitude + DeltavView.designatedAltitude) / 2, 0, 20)
            .endStroke();

        // designated satellite spot
        this.shapeOuter.graphics.beginStroke("black")
            .drawCircle(this.outerCenter.x - DeltavView.designatedAltitude, this.outerCenter.y, 5)
            .endStroke();

        // neighbor satellites
        this.shapeOuter.graphics.beginFill("black")
            .drawCircle(this.outerCenter.x - Math.cos(DeltavView.neighborSatInterval) * DeltavView.designatedAltitude,
            this.outerCenter.y - Math.sin(DeltavView.neighborSatInterval) * DeltavView.designatedAltitude, 4)
            .drawCircle(this.outerCenter.x - Math.cos(DeltavView.neighborSatInterval) * DeltavView.designatedAltitude,
            this.outerCenter.y + Math.sin(DeltavView.neighborSatInterval) * DeltavView.designatedAltitude, 4)
            .endFill();
    }
} 