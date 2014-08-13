/// <reference path="../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../model/body.ts" />
/// <reference path="../model/communicator.ts" />
/// <reference path="../model/satellites.ts" />
/// <reference path="graphicshelper.ts" />
/// <reference path="view.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EntireView = (function (_super) {
    __extends(EntireView, _super);
    function EntireView(stage, innerSize, outerSize) {
        _super.call(this, stage, innerSize, outerSize);

        // shape for drawing in inner coordinates
        this.shapeInner = new createjs.Shape();
        this.shapes.addChild(this.shapeInner);

        // name of orbiting body
        this.txtBodyName = new createjs.Text("", "20px Arial", "black");
        this.txtBodyName.textAlign = "center";
        this.txtBodyName.textBaseline = "middle";
        this.txtBodyName.x = this.outerSize / 2;
        this.txtBodyName.y = this.outerSize / 2;
        this.texts.addChild(this.txtBodyName);

        // altitude of satellites
        this.txtSatAltitude = new createjs.Text("", "16px Arial", "black");
        this.txtSatAltitude.textAlign = "center";
        this.txtSatAltitude.textBaseline = "top";
        this.txtSatAltitude.x = this.outerSize / 2;
        this.texts.addChild(this.txtSatAltitude);

        // distance between one of satellites and next one
        this.txtCommDistance = new createjs.Text("", "16px Arial", "black");
        this.txtCommDistance.textAlign = "left";
        this.txtCommDistance.textBaseline = "top";
        this.texts.addChild(this.txtCommDistance);

        // upper limit to obtain stable connection
        this.txtCommStableRange = new createjs.Text("", "16px Arial", "black");
        this.txtCommStableRange.textAlign = "center";
        this.txtCommStableRange.textBaseline = "top";
        this.txtCommStableRange.x = this.outerSize / 2;
        this.texts.addChild(this.txtCommStableRange);
    }
    EntireView.prototype.show = function () {
        this.shapeInner.scaleX = this.shapeInner.scaleY = this.outerSize / this.innerSize;

        this.shapeInner.graphics.clear();
        this.shapeInner.graphics.setStrokeStyle(this.toInner(0.8));

        this.showSatellites(this.shapeInner.graphics);
        this.showBody(this.shapeInner.graphics);
    };

    EntireView.prototype.showBody = function (g) {
        // orbiting body
        g.beginFill(body.color).drawCircle(this.innerSize / 2, this.innerSize / 2, body.radius).endFill();

        // name of orbiting body
        this.txtBodyName.text = body.name;
    };

    EntireView.prototype.showSatellites = function (g) {
        // orbit
        g.beginStroke("black").drawCircle(this.innerSize / 2, this.innerSize / 2, satellites.altitude + body.radius).endStroke();

        this.txtSatAltitude.text = "Altitude: " + satellites.altitude + " km";
        this.txtSatAltitude.y = this.outerSize / 2 + this.toOuter(satellites.altitude + body.radius) + 10;

        for (var i = 0; i < satellites.count; i++) {
            g.beginFill("black").drawCircle(satellites.satPosition(i, this.innerSize).x, satellites.satPosition(i, this.innerSize).y, this.toInner(4)).endFill();
        }

        for (var i = 0; i < satellites.count; i++) {
            g.beginFill("rgba(255,0,0,0.1)").drawCircle(satellites.satPosition(i, this.innerSize).x, satellites.satPosition(i, this.innerSize).y, satellites.antenna.range).endFill();
        }

        // distance
        g.beginStroke(Communicator.isNextSatConnectable(body, satellites, this.innerSize) ? "blue" : "red");
        GraphicsHelper.drawDualArrow(this.shapeInner.graphics, satellites.satPosition(0, this.innerSize).x, satellites.satPosition(0, this.innerSize).y, satellites.satPosition(1, this.innerSize).x, satellites.satPosition(1, this.innerSize).y, this.toInner(20)).endStroke();

        this.txtCommDistance.text = "Distance: " + satellites.satDistance().toFixed(3) + " km";
        this.txtCommDistance.x = this.toOuter(satellites.satPosition(0, this.innerSize).x + (satellites.satPosition(1, this.innerSize).x - satellites.satPosition(0, this.innerSize).x) / 2) + 5;
        this.txtCommDistance.y = this.toOuter(satellites.satPosition(0, this.innerSize).y + (satellites.satPosition(1, this.innerSize).y - satellites.satPosition(0, this.innerSize).y) / 2) + 5;

        // stable area
        if (Communicator.hasStableArea(body, satellites, this.innerSize)) {
            // upper limit of stable area
            this.shapeInner.graphics.beginStroke("green").drawCircle(this.innerSize / 2, this.innerSize / 2, satellites.stableRange()).endStroke();

            // range of stable area
            this.txtCommStableRange.text = "Stable: " + satellites.stableRange().toFixed(3) + " km";
            this.txtCommStableRange.y = this.outerSize / 2 + this.toOuter(satellites.stableRange()) + 10;
        } else {
            this.txtCommStableRange.text = "";
        }
    };
    return EntireView;
})(View);
//# sourceMappingURL=entireView.js.map
