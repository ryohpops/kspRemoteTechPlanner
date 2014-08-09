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
var Body = (function (_super) {
    __extends(Body, _super);
    function Body(shapeBase, textBase, inner, outer) {
        _super.call(this, shapeBase, textBase, inner, outer);

        this.shapeInner = new createjs.Shape();
        this.shapeInner.scaleX = this.shapeInner.scaleY = this.outerSize / this.innerSize;
        this.shapeBase.addChild(this.shapeInner);

        this.txtName = new createjs.Text("", "20px Arial", "black");
        this.txtName.textAlign = "center";
        this.txtName.textBaseline = "middle";
        this.txtName.x = this.outerSize / 2;
        this.txtName.y = this.outerSize / 2;
        this.textBase.addChild(this.txtName);
    }
    Body.prototype.show = function () {
        this.shapeInner.graphics.clear();

        // planet
        this.shapeInner.graphics.beginFill(this.color).drawCircle(this.innerSize / 2, this.innerSize / 2, this.radius).endFill();

        // name of planet
        this.txtName.text = this.name;
    };
    return Body;
})(Drawable);
//# sourceMappingURL=body.js.map
