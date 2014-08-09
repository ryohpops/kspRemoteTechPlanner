/// <reference path="scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="scripts/typings/easeljs/easeljs.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="bodydata.ts" />
/// <reference path="calculator.ts" />
/// <reference path="graphicshelper.ts" />
/// <reference path="drawable.ts" />
var Satellites = (function (_super) {
    __extends(Satellites, _super);
    function Satellites(shapeBase, textBase, inner, outer) {
        _super.call(this, shapeBase, textBase, inner, outer);
        this.shapeInner = new createjs.Shape();
        this.shapeInner.scaleX = this.shapeInner.scaleY = this.outerSize / this.innerSize;
        this.shapeBase.addChild(this.shapeInner);

        this.txtAltitude = new createjs.Text("", "16px Arial", "black");
        this.txtAltitude.textAlign = "center";
        this.txtAltitude.textBaseline = "top";
        this.txtAltitude.x = this.outerSize / 2;
        this.textBase.addChild(this.txtAltitude);

        this.txtDistance = new createjs.Text("", "16px Arial", "black");
        this.txtDistance.textAlign = "left";
        this.txtDistance.textBaseline = "top";
        this.textBase.addChild(this.txtDistance);

        this.txtStableAreaRange = new createjs.Text("", "16px Arial", "black");
        this.txtStableAreaRange.textAlign = "center";
        this.txtStableAreaRange.textBaseline = "top";
        this.txtStableAreaRange.x = this.outerSize / 2;
        this.textBase.addChild(this.txtStableAreaRange);
    }
    Satellites.prototype.show = function () {
        this.shapeInner.graphics.clear();
        this.shapeInner.graphics.setStrokeStyle(8);

        for (var i = 0; i < this.count; i++) {
            this.shapeInner.graphics.beginFill("black").drawCircle(this.satPosition(i).x, this.satPosition(i).y, 50).endFill();
        }

        // orbit
        this.shapeInner.graphics.beginStroke("black").drawCircle(this.innerSize / 2, this.innerSize / 2, this.altitude + this.parent.radius).endStroke();

        this.txtAltitude.text = "Altitude: " + this.altitude + " km";
        this.txtAltitude.y = this.outerSize / 2 + this.toOuter(this.altitude + this.parent.radius) + 10;

        for (var i = 0; i < this.count; i++) {
            this.shapeInner.graphics.beginFill("rgba(255,0,0,0.1)").drawCircle(this.satPosition(i).x, this.satPosition(i).y, this.range).endFill();
        }

        // distance
        this.shapeInner.graphics.beginStroke(Calculator.length(this.satPosition(0), this.satPosition(1)) <= this.range && this.isNextSatConnectable() ? "blue" : "red");
        GraphicsHelper.drawDualArrow(this.shapeInner.graphics, this.satPosition(0).x, this.satPosition(0).y, this.satPosition(1).x, this.satPosition(1).y, this.toInner(20)).endStroke();

        this.txtDistance.text = "Distance: " + Calculator.length(this.satPosition(0), this.satPosition(1)).toFixed(3) + " km";
        this.txtDistance.x = this.toOuter(this.satPosition(0).x + (this.satPosition(1).x - this.satPosition(0).x) / 2) + 5;
        this.txtDistance.y = this.toOuter(this.satPosition(0).y + (this.satPosition(1).y - this.satPosition(0).y) / 2) + 5;

        // stable area
        if (this.hasStableArea()) {
            var tos = Calculator.circleCrossPoint(new Point(this.innerSize / 2, this.innerSize / 2), this.range, this.satPosition(0), this.satPosition(1), 0 /* high */);

            // top of stable area
            if (this.hasStableArea()) {
                this.shapeInner.graphics.beginStroke("green").drawCircle(this.innerSize / 2, this.innerSize / 2, tos).endStroke();
            }

            // range of stable area
            if (this.hasStableArea()) {
                this.txtStableAreaRange.text = "Stable: " + tos.toFixed(3) + " km";
                this.txtStableAreaRange.y = this.outerSize / 2 + this.toOuter(tos) + 10;
            }
        } else {
            this.txtStableAreaRange.text = "";
        }
    };

    Satellites.prototype.satPosition = function (offset, innerSize, count, altitude) {
        if (typeof innerSize === "undefined") { innerSize = this.innerSize; }
        if (typeof count === "undefined") { count = this.count; }
        if (typeof altitude === "undefined") { altitude = this.altitude + this.parent.radius; }
        return new Point(innerSize / 2 + altitude * Math.cos(2 * Math.PI / count * offset), innerSize / 2 + altitude * Math.sin(2 * Math.PI / count * offset));
    };

    Satellites.prototype.isNextSatConnectable = function () {
        return Calculator.distanceBetweenPointAndLine(new Point(this.innerSize / 2, this.innerSize / 2), this.satPosition(0), this.satPosition(1)) >= this.parent.radius ? true : false;
    };

    Satellites.prototype.hasStableArea = function () {
        return this.count >= 2 && Calculator.length(this.satPosition(0), this.satPosition(1)) <= this.range && this.isNextSatConnectable();
    };
    return Satellites;
})(Drawable);
//# sourceMappingURL=satellites.js.map
