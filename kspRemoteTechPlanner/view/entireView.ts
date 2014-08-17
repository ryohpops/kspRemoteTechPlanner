/// <reference path="../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../model/body.ts" />
/// <reference path="../model/communicator.ts" />
/// <reference path="../model/satellites.ts" />
/// <reference path="graphicshelper.ts" />
/// <reference path="view.ts" />

class EntireView extends View {
    body: Body;
    satellites: Satellites;

    shapeInner: createjs.Shape;
    txtBodyName: createjs.Text;
    txtBodySoI: createjs.Text;
    txtSatAltitude: createjs.Text;
    txtCommDistance: createjs.Text;
    txtCommStableRange: createjs.Text;

    constructor(stage: createjs.Stage, innerSize: number, outerSize: number) {
        super(stage, innerSize, outerSize);

        // shape for drawing in inner coordinates
        this.shapeInner = new createjs.Shape();
        this.shapes.addChild(this.shapeInner);

        // name of orbiting body
        this.txtBodyName = new createjs.Text("", "20px Arial", "black");
        this.txtBodyName.textAlign = "center";
        this.txtBodyName.textBaseline = "middle";
        this.txtBodyName.x = this.outerSize / 2;
        this.txtBodyName.y = this.outerSize / 2;
        this.texts.addChild(this.txtBodyName);

        // sphere of influence
        this.txtBodySoI = new createjs.Text("", "16px Arial", "black");
        this.txtBodySoI.textAlign = "center";
        this.txtBodySoI.textBaseline = "top";
        this.txtBodySoI.x = this.outerSize / 2;
        this.texts.addChild(this.txtBodySoI);

        // altitude of satellites
        this.txtSatAltitude = new createjs.Text("", "16px Arial", "black");
        this.txtSatAltitude.textAlign = "center";
        this.txtSatAltitude.textBaseline = "top";
        this.txtSatAltitude.x = this.outerSize / 2;
        this.texts.addChild(this.txtSatAltitude);

        // distance between one of satellites and next one
        this.txtCommDistance = new createjs.Text("", "16px Arial", "black");
        this.txtCommDistance.textAlign = "left";
        this.txtCommDistance.textBaseline = "top";
        this.texts.addChild(this.txtCommDistance);

        // upper limit to obtain stable connection
        this.txtCommStableRange = new createjs.Text("", "16px Arial", "black");
        this.txtCommStableRange.textAlign = "center";
        this.txtCommStableRange.textBaseline = "bottom";
        this.txtCommStableRange.x = this.outerSize / 2;
        this.texts.addChild(this.txtCommStableRange);
    }

    show(): void {
        this.shapeInner.scaleX = this.shapeInner.scaleY = this.outerSize / this.innerSize;

        this.shapeInner.graphics.clear();
        this.shapeInner.graphics.setStrokeStyle(this.toInner(0.8));

        this.showSatellites(this.shapeInner.graphics);
        this.showBody(this.shapeInner.graphics);
    }

    private showBody(g: createjs.Graphics): void {
        // orbiting body
        g.beginFill(this.body.color)
            .drawCircle(this.innerSize / 2, this.innerSize / 2, this.body.radius)
            .endFill();

        // name of orbiting body
        this.txtBodyName.text = this.body.name;

        // sphere of influence
        g.beginStroke("yellow")
            .drawCircle(this.innerSize / 2, this.innerSize / 2, this.body.soi)
            .endStroke();

        // height of SoI
        this.txtBodySoI.text = "Sphere of Influence: " + this.body.soi.toLocaleString("en-US", { maximumFractionDigits: 3 }) + " km";
        this.txtBodySoI.y = this.outerSize / 2 + Math.max(this.toOuter(this.body.soi) + 10, this.toOuter(this.body.radius + this.satellites.altitude) + 30);
    }

    private showSatellites(g: createjs.Graphics): void {
        // orbit
        g.beginStroke("black")
            .drawCircle(this.innerSize / 2, this.innerSize / 2, this.satellites.altitude + this.body.radius)
            .endStroke();

        this.txtSatAltitude.text = "Altitude: " + this.satellites.altitude.toLocaleString("en-US", { maximumFractionDigits: 3 }) + " km";
        this.txtSatAltitude.y = this.outerSize / 2 + this.toOuter(this.satellites.altitude + this.body.radius) + 10;

        // positions
        for (var i: number = 0; i < this.satellites.count; i++) {
            g.beginFill("black")
                .drawCircle(this.satellites.satPosition(i, this.innerSize).x, this.satellites.satPosition(i, this.innerSize).y, this.toInner(4))
                .endFill();
        }

        // communication area
        for (var i: number = 0; i < this.satellites.count; i++) {
            g.beginFill("rgba(255,0,0,0.1)")
                .drawCircle(this.satellites.satPosition(i, this.innerSize).x, this.satellites.satPosition(i, this.innerSize).y, this.satellites.antenna.range)
                .endFill();
        }

        // distance
        g.beginStroke(Communicator.isNextSatConnectable(this.body, this.satellites, this.innerSize) ? "blue" : "red");
        GraphicsHelper.drawDualArrow(this.shapeInner.graphics,
            this.satellites.satPosition(0, this.innerSize).x, this.satellites.satPosition(0, this.innerSize).y,
            this.satellites.satPosition(1, this.innerSize).x, this.satellites.satPosition(1, this.innerSize).y, this.toInner(20))
            .endStroke();

        this.txtCommDistance.text = "Distance: " + this.satellites.satDistance().toLocaleString("en-US", { maximumFractionDigits: 3 }) + " km";
        this.txtCommDistance.x = this.toOuter(this.satellites.satPosition(0, this.innerSize).x + (this.satellites.satPosition(1, this.innerSize).x
            - this.satellites.satPosition(0, this.innerSize).x) / 2) + 5;
        this.txtCommDistance.y = this.toOuter(this.satellites.satPosition(0, this.innerSize).y + (this.satellites.satPosition(1, this.innerSize).y
            - this.satellites.satPosition(0, this.innerSize).y) / 2) + 5;

        // stable area
        if (Communicator.hasStableArea(this.body, this.satellites, this.innerSize)) {
            // upper limit of stable area
            this.shapeInner.graphics.beginStroke("green")
                .drawCircle(this.innerSize / 2, this.innerSize / 2, this.satellites.stableRange() + this.body.radius)
                .endStroke();

            // range of stable area
            this.txtCommStableRange.text = "Stable: " + this.satellites.stableRange().toLocaleString("en-US", { maximumFractionDigits: 3 }) + " km";
            this.txtCommStableRange.y = this.outerSize / 2 - this.toOuter(this.satellites.stableRange() + this.body.radius) - 10;
        } else {
            this.txtCommStableRange.text = "";
        }
    }
}