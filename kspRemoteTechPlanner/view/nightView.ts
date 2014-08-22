/// <reference path="../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../model/body.ts" />
/// <reference path="../model/satellites.ts" />
/// <reference path="../calculator/point.ts" />
/// <reference path="graphicshelper.ts" />
/// <reference path="view.ts" />


class NightView extends View {
    private static bodyRadius = 50;
    private static orbitRadius = 150;

    body: Body;
    satellites: Satellites;

    shapeOuter: createjs.Shape;
    txtOrbitalPeriod: createjs.Text;
    txtRequiredGenerator: createjs.Text;
    txtNightTime: createjs.Text;
    txtRequiredBattery: createjs.Text;

    constructor(stage: createjs.Stage, innerSize: number, outerSize: number) {
        super(stage, innerSize, outerSize);

        // shape for drawing in outer coordinates
        this.shapeOuter = new createjs.Shape();
        this.shapes.addChild(this.shapeOuter);

        // orbital period
        this.txtOrbitalPeriod = new createjs.Text("", "16px Arial", "black");
        this.txtOrbitalPeriod.textAlign = "center";
        this.txtOrbitalPeriod.textBaseline = "bottom";
        this.txtOrbitalPeriod.x = this.outerCenter.x;
        this.txtOrbitalPeriod.y = this.outerCenter.y - NightView.orbitRadius - 5;
        this.texts.addChild(this.txtOrbitalPeriod);

        // required generation amount of electricity
        this.txtRequiredGenerator = new createjs.Text("", "16px Arial", "black");
        this.txtRequiredGenerator.textAlign = "center";
        this.txtRequiredGenerator.textBaseline = "top";
        this.txtRequiredGenerator.x = this.outerCenter.x;
        this.txtRequiredGenerator.y = this.outerCenter.y + NightView.orbitRadius + 5;
        this.texts.addChild(this.txtRequiredGenerator);

        // time of night
        this.txtNightTime = new createjs.Text("", "16px Arial", "black");
        this.txtNightTime.textAlign = "left";
        this.txtNightTime.textBaseline = "bottom";
        this.txtNightTime.x = this.outerCenter.x;
        this.txtNightTime.y = this.outerCenter.y - NightView.bodyRadius - 5;
        this.texts.addChild(this.txtNightTime);

        // required battery capacity
        this.txtRequiredBattery = new createjs.Text("", "16px Arial", "black");
        this.txtRequiredBattery.textAlign = "left";
        this.txtRequiredBattery.textBaseline = "top";
        this.txtRequiredBattery.x = this.outerCenter.x;
        this.txtRequiredBattery.y = this.outerCenter.y + NightView.bodyRadius + 5;
        this.texts.addChild(this.txtRequiredBattery);
    }

    show(): void {
        this.shapeOuter.graphics.clear();
        this.shapeOuter.graphics.setStrokeStyle(2);

        // night area
        this.shapeOuter.graphics.beginFill("rgba(0,0,0,0.2)")
            .drawRect(this.outerCenter.x, this.outerCenter.y - NightView.bodyRadius, this.outerSize / 2, NightView.bodyRadius * 2)
            .endFill();

        // planet
        this.shapeOuter.graphics.beginFill(this.body.color)
            .drawCircle(this.outerCenter.x, this.outerCenter.y, NightView.bodyRadius)
            .endFill();

        // orbit
        this.shapeOuter.graphics.beginStroke("lightgray")
            .drawCircle(this.outerCenter.x, this.outerCenter.y, NightView.orbitRadius)
            .endStroke();

        // orbital period
        this.txtOrbitalPeriod.text = "Orbital period: " + this.satellites.orbitalPeriod().toFixed(3) + " sec.";

        // night time
        this.txtNightTime.text = "Night time: " + this.satellites.nightTime().toFixed(3) + " sec.";

        // required battery
        this.txtRequiredBattery.text = "Required Battery: " + this.satellites.requiredBattery().toFixed(3);

        // required generator
        this.txtRequiredGenerator.text = "Required Generator: " + this.satellites.requiredGenerator().toFixed(3) + " per sec.";
    }
} 