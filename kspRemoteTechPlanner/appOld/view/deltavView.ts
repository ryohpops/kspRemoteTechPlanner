/// <reference path="../references.ts" />

class DeltavView extends View {
    'use strict';

    private static bodyRadius: number = 20;
    private static parkingAltitude: number = 50;
    private static designatedAltitude: number = 150;
    private static neighborSatInterval: number = Math.PI / 3;

    satellites: Satellites;

    private shapeOuter: createjs.Shape;
    private txtDV1: createjs.Text;
    private txtDV2: createjs.Text;
    private txtDVTotal: createjs.Text;
    private txtPhaseAngle: createjs.Text;
    private txtPhaseTime: createjs.Text;

    constructor(stage: createjs.Stage, innerSize: number, outerSize: number, satellites: Satellites) {
        super(stage, innerSize, outerSize);
        this.satellites = satellites;

        // shape for drawing in outer coordinates
        this.shapeOuter = new createjs.Shape();
        this.shapes.addChild(this.shapeOuter);

        // delta-v to start hohmann transfer
        this.txtDV1 = new createjs.Text("", View.fontSetNormal);
        this.txtDV1.textAlign = "left";
        this.txtDV1.textBaseline = "middle";
        this.txtDV1.x = this.outerCenter.x + DeltavView.parkingAltitude + View.marginText;
        this.txtDV1.y = this.outerCenter.y;
        this.texts.addChild(this.txtDV1);

        // delta-v to finish hohmann transfer
        this.txtDV2 = new createjs.Text("", View.fontSetNormal);
        this.txtDV2.textAlign = "left";
        this.txtDV2.textBaseline = "middle";
        this.txtDV2.x = this.outerCenter.x - DeltavView.designatedAltitude + View.marginText;
        this.txtDV2.y = this.outerCenter.y;
        this.texts.addChild(this.txtDV2);

        // start delta-v + finish delta-v
        this.txtDVTotal = new createjs.Text("", View.fontSetNormal);
        this.txtDVTotal.textAlign = "center";
        this.txtDVTotal.textBaseline = "top";
        this.txtDVTotal.x = this.outerCenter.x;
        this.txtDVTotal.y = this.outerCenter.y + DeltavView.parkingAltitude + View.marginText;
        this.texts.addChild(this.txtDVTotal);

        // phase angle to insert new satellite into next/previous of satellites chain.
        this.txtPhaseAngle = new createjs.Text("", View.fontSetNormal);
        this.txtPhaseAngle.textAlign = "center";
        this.txtPhaseAngle.textBaseline = "bottom";
        this.txtPhaseAngle.x = this.outerCenter.x;
        this.txtPhaseAngle.y = this.outerCenter.y - DeltavView.designatedAltitude - View.marginText;
        this.texts.addChild(this.txtPhaseAngle);

        // phase angle measured as time
        this.txtPhaseTime = new createjs.Text("", View.fontSetNormal);
        this.txtPhaseTime.textAlign = "center";
        this.txtPhaseTime.textBaseline = "top";
        this.txtPhaseTime.x = this.outerCenter.x;
        this.txtPhaseTime.y = this.outerCenter.y + DeltavView.designatedAltitude + View.marginText;
        this.texts.addChild(this.txtPhaseTime);
    }

    show(): void {
        this.shapeOuter.graphics.clear();
        this.shapeOuter.graphics.setStrokeStyle(View.strokeLineWidth);

        this.showFigures(this.shapeOuter.graphics, this.satellites, this.satellites.body);
        this.update();
    }

    private showFigures(g: createjs.Graphics, s: Satellites, b: Body) {
        // body
        this.shapeOuter.graphics.beginFill(b.color)
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
            this.outerCenter.y - (DeltavView.parkingAltitude + DeltavView.designatedAltitude) / 2, 0, View.arrowSize)
            .endStroke();

        this.txtDV1.text = "Start dV:\n" + (s.hohmannStartDeltaV() * 1000).toLocaleString("en", View.localeSetting) + " m/s";
        this.txtDV2.text = "Finish dV:\n" + (s.hohmannFinishDeltaV() * 1000).toLocaleString("en", View.localeSetting) + " m/s";
        this.txtDVTotal.text = "Total dV: " + ((s.hohmannStartDeltaV() + s.hohmannFinishDeltaV()) * 1000)
            .toLocaleString("en", View.localeSetting) + "m/s";

        // designated satellite spot
        this.shapeOuter.graphics.beginStroke("black")
            .drawCircle(this.outerCenter.x - DeltavView.designatedAltitude, this.outerCenter.y, View.dotRadius)
            .endStroke();

        // neighbor satellites
        this.shapeOuter.graphics.beginFill("black")
            .drawCircle(this.outerCenter.x - Math.cos(DeltavView.neighborSatInterval) * DeltavView.designatedAltitude,
            this.outerCenter.y - Math.sin(DeltavView.neighborSatInterval) * DeltavView.designatedAltitude, View.dotRadius)
            .drawCircle(this.outerCenter.x - Math.cos(DeltavView.neighborSatInterval) * DeltavView.designatedAltitude,
            this.outerCenter.y + Math.sin(DeltavView.neighborSatInterval) * DeltavView.designatedAltitude, View.dotRadius)
            .endFill();

        this.txtPhaseAngle.text = "Slide angle: " + s.slidePhaseAngle().toLocaleString("en", View.localeSetting) + " deg.";
        this.txtPhaseTime.text = "Slide time: " + s.slidePhaseTime().toLocaleString("en", View.localeSetting) + " sec.";
    }
} 