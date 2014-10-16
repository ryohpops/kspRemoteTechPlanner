/// <reference path="../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../model/body.ts" />
/// <reference path="../model/satellites.ts" />
/// <reference path="../calculator/point.ts" />
/// <reference path="graphicshelper.ts" />
/// <reference path="view.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NightView = (function (_super) {
    __extends(NightView, _super);
    function NightView(stage, innerSize, outerSize) {
        _super.call(this, stage, innerSize, outerSize);

        // shape for drawing in outer coordinates
        this.shapeOuter = new createjs.Shape();
        this.shapes.addChild(this.shapeOuter);

        // orbital period
        this.txtOrbitalPeriod = new createjs.Text("", View.fontSetNormal);
        this.txtOrbitalPeriod.textAlign = "center";
        this.txtOrbitalPeriod.textBaseline = "bottom";
        this.txtOrbitalPeriod.x = this.outerCenter.x;
        this.txtOrbitalPeriod.y = this.outerCenter.y - NightView.orbitRadius - View.marginText;
        this.texts.addChild(this.txtOrbitalPeriod);

        // required generation amount of electricity
        this.txtRequiredGenerator = new createjs.Text("", View.fontSetNormal);
        this.txtRequiredGenerator.textAlign = "center";
        this.txtRequiredGenerator.textBaseline = "top";
        this.txtRequiredGenerator.x = this.outerCenter.x;
        this.txtRequiredGenerator.y = this.outerCenter.y + NightView.orbitRadius + View.marginText;
        this.texts.addChild(this.txtRequiredGenerator);

        // time of night
        this.txtNightTime = new createjs.Text("", View.fontSetNormal);
        this.txtNightTime.textAlign = "left";
        this.txtNightTime.textBaseline = "bottom";
        this.txtNightTime.x = this.outerCenter.x;
        this.txtNightTime.y = this.outerCenter.y - NightView.bodyRadius - View.marginText;
        this.texts.addChild(this.txtNightTime);

        // required battery capacity
        this.txtRequiredBattery = new createjs.Text("", View.fontSetNormal);
        this.txtRequiredBattery.textAlign = "left";
        this.txtRequiredBattery.textBaseline = "top";
        this.txtRequiredBattery.x = this.outerCenter.x;
        this.txtRequiredBattery.y = this.outerCenter.y + NightView.bodyRadius + View.marginText;
        this.texts.addChild(this.txtRequiredBattery);
    }
    NightView.prototype.show = function () {
        this.shapeOuter.graphics.clear();
        this.shapeOuter.graphics.setStrokeStyle(View.strokeLineWidth);

        this.showFigures(this.shapeOuter.graphics, this.satellites, this.satellites.body);
    };

    NightView.prototype.showFigures = function (g, s, b) {
        // night area
        this.shapeOuter.graphics.beginFill("rgba(0,0,0,0.2)").drawRect(this.outerCenter.x, this.outerCenter.y - NightView.bodyRadius, this.outerSize / 2, NightView.bodyRadius * 2).endFill();

        // planet
        this.shapeOuter.graphics.beginFill(b.color).drawCircle(this.outerCenter.x, this.outerCenter.y, NightView.bodyRadius).endFill();

        // orbit
        this.shapeOuter.graphics.beginStroke("gray").drawCircle(this.outerCenter.x, this.outerCenter.y, NightView.orbitRadius).endStroke();

        // orbital period
        this.txtOrbitalPeriod.text = "Orbital period: " + s.orbitalPeriod().toLocaleString("en", View.localeSetting) + " sec.";

        // night time
        this.txtNightTime.text = "Night time: " + s.nightTime().toLocaleString("en", View.localeSetting) + " sec.";

        // required battery
        this.txtRequiredBattery.text = "Required Battery: " + s.requiredBattery().toLocaleString("en", View.localeSetting);

        // required generator
        this.txtRequiredGenerator.text = "Required Generator: " + s.requiredGenerator().toLocaleString("en", View.localeSetting) + " per sec.";
    };
    NightView.bodyRadius = 50;
    NightView.orbitRadius = 150;
    return NightView;
})(View);
//# sourceMappingURL=nightView.js.map
