/// <reference path="scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="scripts/typings/tweenjs/tweenjs.d.ts" />
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
var FixedMap = (function (_super) {
    __extends(FixedMap, _super);
    function FixedMap(shapeBase, textBase, inner, outer) {
        _super.call(this, shapeBase, textBase, inner, outer);

        this.shapeInner = new createjs.Shape();
        this.shapeInner.scaleX = this.shapeInner.scaleY = this.outerSize / this.innerSize;
        this.shapeBase.addChild(this.shapeInner);

        this.txtDayTime = new createjs.Text("", "20px Arial", "black");
        this.txtDayTime.textAlign = "center";
        this.txtDayTime.textBaseline = "top";
        this.txtDayTime.x = this.outerSize / 2;
        this.txtDayTime.y = this.outerSize / 2;
        this.textBase.addChild(this.txtDayTime);

        this.txtRequiredGenerator = new createjs.Text("", "20px Arial", "black");
        this.txtRequiredGenerator.textAlign = "center";
        this.txtRequiredGenerator.textBaseline = "top";
        this.txtRequiredGenerator.x = this.outerSize / 2;
        this.txtRequiredGenerator.y = this.outerSize / 2;
        this.textBase.addChild(this.txtRequiredGenerator);

        this.txtNightTime = new createjs.Text("", "20px Arial", "black");
        this.txtNightTime.textAlign = "left";
        this.txtNightTime.textBaseline = "middle";
        this.txtNightTime.x = this.outerSize / 2;
        this.txtNightTime.y = this.outerSize / 2;
        this.textBase.addChild(this.txtNightTime);

        this.txtRequiredBattery = new createjs.Text("", "20px Arial", "black");
        this.txtRequiredBattery.textAlign = "left";
        this.txtRequiredBattery.textBaseline = "top";
        this.txtRequiredBattery.x = this.outerSize / 2;
        this.txtRequiredBattery.y = this.outerSize / 2;
        this.textBase.addChild(this.txtRequiredBattery);
    }
    FixedMap.prototype.show = function () {
    };
    return FixedMap;
})(Drawable);
//# sourceMappingURL=fixedMap.js.map
