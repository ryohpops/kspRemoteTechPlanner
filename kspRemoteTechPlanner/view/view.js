/// <reference path="../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../calculator/point.ts" />
var View = (function () {
    function View(stage, innerSize, outerSize) {
        this.shapes = new createjs.Container();
        this.texts = new createjs.Container();
        stage.addChild(this.shapes);
        stage.addChild(this.texts);

        this.innerSize = innerSize;
        this.outerSize = outerSize;
    }
    Object.defineProperty(View.prototype, "innerCenter", {
        get: function () {
            return new Point(this.innerSize / 2, this.innerSize / 2);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(View.prototype, "outerCenter", {
        get: function () {
            return new Point(this.outerSize / 2, this.outerSize / 2);
        },
        enumerable: true,
        configurable: true
    });

    View.prototype.toInner = function (valueOuter) {
        return valueOuter * this.innerSize / this.outerSize;
    };

    View.prototype.toOuter = function (valueInner) {
        return valueInner * this.outerSize / this.innerSize;
    };
    return View;
})();
//# sourceMappingURL=view.js.map
