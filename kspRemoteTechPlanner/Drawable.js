/// <reference path="scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="scripts/typings/tweenjs/tweenjs.d.ts" />
var Drawable = (function () {
    function Drawable(shapeBase, textBase, inner, outer) {
        this.shapeBase = shapeBase;
        this.textBase = textBase;
        this.innerSize = inner;
        this.outerSize = outer;
    }
    Drawable.prototype.show = function () {
    };

    Drawable.prototype.toInner = function (valueOuter) {
        return valueOuter * this.innerSize / this.outerSize;
    };

    Drawable.prototype.toOuter = function (valueInner) {
        return valueInner * this.outerSize / this.innerSize;
    };
    return Drawable;
})();
//# sourceMappingURL=Drawable.js.map
