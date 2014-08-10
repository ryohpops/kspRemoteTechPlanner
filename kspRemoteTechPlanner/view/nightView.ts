/// <reference path="../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../model/body.ts" />
/// <reference path="../model/communicator.ts" />
/// <reference path="../model/point.ts" />
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
        this.txtOrbitalPeriod = new createjs.Text("", "20px Arial", "black");
        this.txtOrbitalPeriod.textAlign = "center";
        this.txtOrbitalPeriod.textBaseline = "bottom";
        this.txtOrbitalPeriod.x = this.outerSize / 2;
        this.txtOrbitalPeriod.y = this.outerSize / 2 - NightView.orbitRadius - 5;
        this.texts.addChild(this.txtOrbitalPeriod);

        // required generation amount of electricity
        this.txtRequiredGenerator = new createjs.Text("", "20px Arial", "black");
        this.txtRequiredGenerator.textAlign = "center";
        this.txtRequiredGenerator.textBaseline = "top";
        this.txtRequiredGenerator.x = this.outerSize / 2;
        this.txtRequiredGenerator.y = this.outerSize / 2 + NightView.orbitRadius + 5;
        this.texts.addChild(this.txtRequiredGenerator);

        // time of night
        this.txtNightTime = new createjs.Text("", "20px Arial", "black");
        this.txtNightTime.textAlign = "left";
        this.txtNightTime.textBaseline = "bottom";
        this.txtNightTime.x = this.outerSize / 2 + NightView.bodyRadius;
        this.txtNightTime.y = this.outerSize / 2 - NightView.bodyRadius - 5;
        this.texts.addChild(this.txtNightTime);

        // required battery capacity
        this.txtRequiredBattery = new createjs.Text("", "20px Arial", "black");
        this.txtRequiredBattery.textAlign = "left";
        this.txtRequiredBattery.textBaseline = "top";
        this.txtRequiredBattery.x = this.outerSize / 2 + NightView.bodyRadius;
        this.txtRequiredBattery.y = this.outerSize / 2 + NightView.bodyRadius + 5;
        this.texts.addChild(this.txtRequiredBattery);
    }

    show(): void {
        this.shapeOuter.graphics.clear();

        // night area
        this.shapeOuter.graphics.beginFill("rgba(0,0,0,0.2)")
            .drawRect(this.outerSize / 2, this.outerSize / 2 - NightView.bodyRadius, this.outerSize / 2, NightView.bodyRadius * 2)
            .endFill();

        // planet
        this.shapeOuter.graphics.beginFill(body.color)
            .drawCircle(this.outerSize / 2, this.outerSize / 2, NightView.bodyRadius)
            .endFill();

        // orbit
        this.shapeOuter.graphics.beginStroke("black")
            .drawCircle(this.outerSize / 2, this.outerSize / 2, NightView.orbitRadius)
            .endFill();

    }
} 