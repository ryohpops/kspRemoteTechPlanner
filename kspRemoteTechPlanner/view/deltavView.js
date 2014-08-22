/// <reference path="../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../model/body.ts" />
/// <reference path="../model/satellites.ts" />
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
    }
    DeltavView.prototype.show = function () {
        this.shapeOuter.graphics.clear();
        this.shapeOuter.graphics.setStrokeStyle(2);

        // body
        this.shapeOuter.graphics.beginFill(this.body.color).drawCircle(this.outerSize / 2, this.outerSize / 2, DeltavView.bodyRadius).endFill();

        // parking orbit
        this.shapeOuter.graphics.beginStroke("black").drawCircle(this.outerSize / 2, this.outerSize / 2, DeltavView.parkingAltitude).endStroke();

        // designated orbit
        this.shapeOuter.graphics.beginStroke("black").drawCircle(this.outerSize / 2, this.outerSize / 2, DeltavView.designatedAltitude).endStroke();

        // hohmann transfer trajectory
        this.shapeOuter.graphics.beginStroke("green").arc(this.outerSize / 2 + (DeltavView.parkingAltitude - DeltavView.designatedAltitude) / 2, this.outerSize / 2, (DeltavView.parkingAltitude + DeltavView.designatedAltitude) / 2, 0, Math.PI, true).endStroke();
        // designated satellite spot
        // neighbor satellites
    };
    DeltavView.bodyRadius = 20;
    DeltavView.parkingAltitude = 50;
    DeltavView.designatedAltitude = 150;
    return DeltavView;
})(View);
//# sourceMappingURL=deltavView.js.map
