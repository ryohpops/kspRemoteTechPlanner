/// <reference path="../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../model/body.ts" />
/// <reference path="../model/satellites.ts" />
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
        this.txtOrbitalPeriod.x = this.outerSize / 2;
        this.txtOrbitalPeriod.y = this.outerSize / 2 - NightView.orbitRadius - 5;
        this.texts.addChild(this.txtOrbitalPeriod);

        // required generation amount of electricity
        this.txtRequiredGenerator = new createjs.Text("", "16px Arial", "black");
        this.txtRequiredGenerator.textAlign = "center";
        this.txtRequiredGenerator.textBaseline = "top";
        this.txtRequiredGenerator.x = this.outerSize / 2;
        this.txtRequiredGenerator.y = this.outerSize / 2 + NightView.orbitRadius + 5;
        this.texts.addChild(this.txtRequiredGenerator);

        // time of night
        this.txtNightTime = new createjs.Text("", "16px Arial", "black");
        this.txtNightTime.textAlign = "left";
        this.txtNightTime.textBaseline = "bottom";
        this.txtNightTime.x = this.outerSize / 2;
        this.txtNightTime.y = this.outerSize / 2 - NightView.bodyRadius - 5;
        this.texts.addChild(this.txtNightTime);

        // required battery capacity
        this.txtRequiredBattery = new createjs.Text("", "16px Arial", "black");
        this.txtRequiredBattery.textAlign = "left";
        this.txtRequiredBattery.textBaseline = "top";
        this.txtRequiredBattery.x = this.outerSize / 2;
        this.txtRequiredBattery.y = this.outerSize / 2 + NightView.bodyRadius + 5;
        this.texts.addChild(this.txtRequiredBattery);
    }

    show(): void {
        this.shapeOuter.graphics.clear();
        this.shapeOuter.graphics.setStrokeStyle(2);

        // night area
        this.shapeOuter.graphics.beginFill("rgba(0,0,0,0.2)")
            .drawRect(this.outerSize / 2, this.outerSize / 2 - NightView.bodyRadius, this.outerSize / 2, NightView.bodyRadius * 2)
            .endFill();

        // planet
        this.shapeOuter.graphics.beginFill(body.color)
            .drawCircle(this.outerSize / 2, this.outerSize / 2, NightView.bodyRadius)
            .endFill();

        // orbit
        this.shapeOuter.graphics.beginStroke("lightgray")
            .drawCircle(this.outerSize / 2, this.outerSize / 2, NightView.orbitRadius)
            .endStroke();

        // orbital period
        this.txtOrbitalPeriod.text = "Orbital period: " + satellites.orbitalPeriod().toFixed(3) + " sec.";

        // night time
        this.txtNightTime.text = "Night time: " + satellites.nightTime().toFixed(3) + " sec.";

        // required battery
        this.txtRequiredBattery.text = "Required Battery: " + satellites.requiredBattery().toFixed(3);

        // required generator
        this.txtRequiredGenerator.text = "Required Generator: " + satellites.requiredGenerator().toFixed(3) + " per sec.";
    }
} 