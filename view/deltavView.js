/// <reference path="../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../model/body.ts" />
/// <reference path="../model/satellites.ts" />
/// <reference path="../calculator/point.ts" />
/// <reference path="../view/graphicshelper.ts" />
/// <reference path="../view/view.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DeltavView = (function (_super) {
    __extends(DeltavView, _super);
    function DeltavView(stage, innerSize, outerSize) {
        _super.call(this, stage, innerSize, outerSize);

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
    DeltavView.prototype.show = function () {
        this.shapeOuter.graphics.clear();
        this.shapeOuter.graphics.setStrokeStyle(View.strokeLineWidth);

        this.showFigures(this.shapeOuter.graphics, this.satellites, this.satellites.body);
    };

    DeltavView.prototype.showFigures = function (g, s, b) {
        // body
        this.shapeOuter.graphics.beginFill(b.color).drawCircle(this.outerCenter.x, this.outerCenter.y, DeltavView.bodyRadius).endFill();

        // parking orbit
        this.shapeOuter.graphics.beginStroke("black").drawCircle(this.outerCenter.x, this.outerCenter.y, DeltavView.parkingAltitude).endStroke();

        // designated orbit
        this.shapeOuter.graphics.beginStroke("black").drawCircle(this.outerCenter.x, this.outerCenter.y, DeltavView.designatedAltitude).endStroke();

        // hohmann transfer trajectory
        this.shapeOuter.graphics.beginStroke("green").arc(this.outerCenter.x + (DeltavView.parkingAltitude - DeltavView.designatedAltitude) / 2, this.outerCenter.y, (DeltavView.parkingAltitude + DeltavView.designatedAltitude) / 2, 0, Math.PI, true).endStroke();
        this.shapeOuter.graphics.beginStroke("green");
        GraphicsHelper.drawArrow(this.shapeOuter.graphics, this.outerCenter.x + (DeltavView.parkingAltitude - DeltavView.designatedAltitude) / 2, this.outerCenter.y - (DeltavView.parkingAltitude + DeltavView.designatedAltitude) / 2, 0, View.arrowSize).endStroke();

        this.txtDV1.text = "Start dV:\n" + (s.hohmannStartDeltaV() * 1000).toLocaleString("en", View.localeSetting) + " m/s";
        this.txtDV2.text = "Finish dV:\n" + (s.hohmannFinishDeltaV() * 1000).toLocaleString("en", View.localeSetting) + " m/s";

        // designated satellite spot
        this.shapeOuter.graphics.beginStroke("black").drawCircle(this.outerCenter.x - DeltavView.designatedAltitude, this.outerCenter.y, View.dotRadius).endStroke();

        // neighbor satellites
        this.shapeOuter.graphics.beginFill("black").drawCircle(this.outerCenter.x - Math.cos(DeltavView.neighborSatInterval) * DeltavView.designatedAltitude, this.outerCenter.y - Math.sin(DeltavView.neighborSatInterval) * DeltavView.designatedAltitude, View.dotRadius).drawCircle(this.outerCenter.x - Math.cos(DeltavView.neighborSatInterval) * DeltavView.designatedAltitude, this.outerCenter.y + Math.sin(DeltavView.neighborSatInterval) * DeltavView.designatedAltitude, View.dotRadius).endFill();

        this.txtPhaseAngle.text = "Slide angle: " + s.slidePhaseAngle().toLocaleString("en", View.localeSetting) + " deg.";
        this.txtPhaseTime.text = "Slide time: " + s.slidePhaseTime().toLocaleString("en", View.localeSetting) + " sec.";
    };
    DeltavView.bodyRadius = 20;
    DeltavView.parkingAltitude = 50;
    DeltavView.designatedAltitude = 150;
    DeltavView.neighborSatInterval = Math.PI / 3;
    return DeltavView;
})(View);
//# sourceMappingURL=deltavView.js.map
