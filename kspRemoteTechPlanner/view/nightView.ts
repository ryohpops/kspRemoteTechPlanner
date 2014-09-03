/// <reference path="../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../model/body.ts" />
/// <reference path="../model/satellites.ts" />
/// <reference path="../calculator/point.ts" />
/// <reference path="view.ts" />

class NightView extends View {
    private static bodyRadius = 50;
    private static orbitRadius = 150;

    satellites: Satellites;

    private shapeOuter: createjs.Shape;
    private txtOrbitalPeriod: createjs.Text;
    private txtRequiredGenerator: createjs.Text;
    private txtNightTime: createjs.Text;
    private txtRequiredBattery: createjs.Text;

    constructor(stage: createjs.Stage, innerSize: number, outerSize: number) {
        super(stage, innerSize, outerSize);

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

    show(): void {
        this.shapeOuter.graphics.clear();
        this.shapeOuter.graphics.setStrokeStyle(View.strokeLineWidth);

        this.showFigures();
    }

    showFigures() {
        alert("You must override the function showFigures without calling function super.");
    }

    showNightArea() {
        // night area
        this.shapeOuter.graphics.beginFill("rgba(0,0,0,0.2)")
            .drawRect(this.outerCenter.x, this.outerCenter.y - NightView.bodyRadius, this.outerSize / 2, NightView.bodyRadius * 2)
            .endFill();
    }

    showBody(b:Body) {
        // planet
        this.shapeOuter.graphics.beginFill(b.color)
            .drawCircle(this.outerCenter.x, this.outerCenter.y, NightView.bodyRadius)
            .endFill();
    }

    showOrbit() {
        // orbit
        this.shapeOuter.graphics.beginStroke("gray")
            .drawCircle(this.outerCenter.x, this.outerCenter.y, NightView.orbitRadius)
            .endStroke();
    }

    updateText(s: Satellites) {
        // orbital period
        this.txtOrbitalPeriod.text = "Orbital period: " + s.orbitalPeriod().toLocaleString("en", View.localeSetting) + " sec.";

        // night time
        this.txtNightTime.text = "Night time: " + s.nightTime().toLocaleString("en", View.localeSetting) + " sec.";

        // required battery
        this.txtRequiredBattery.text = "Required Battery: " + s.requiredBattery().toLocaleString("en", View.localeSetting);

        // required generator
        this.txtRequiredGenerator.text = "Required Generator: " + s.requiredGenerator().toLocaleString("en", View.localeSetting) + " per sec.";
    }
} 