/// <reference path="../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../model/body.ts" />
/// <reference path="../model/satellites.ts" />
/// <reference path="../calculator/point.ts" />
/// <reference path="../calculator/communication.ts" />
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
        this.txtBodyName = new createjs.Text("", View.fontSetBig);
        this.txtBodyName.textAlign = "center";
        this.txtBodyName.textBaseline = "middle";
        this.txtBodyName.x = this.outerCenter.x;
        this.txtBodyName.y = this.outerCenter.y;
        this.texts.addChild(this.txtBodyName);

        // sphere of influence
        this.txtBodySoI = new createjs.Text("", View.fontSetNormal);
        this.txtBodySoI.textAlign = "center";
        this.txtBodySoI.textBaseline = "top";
        this.txtBodySoI.x = this.outerCenter.x;
        this.texts.addChild(this.txtBodySoI);

        // altitude of satellites
        this.txtSatAltitude = new createjs.Text("", View.fontSetNormal);
        this.txtSatAltitude.textAlign = "center";
        this.txtSatAltitude.textBaseline = "top";
        this.txtSatAltitude.x = this.outerCenter.x;
        this.texts.addChild(this.txtSatAltitude);

        // distance between one of satellites and next one
        this.txtCommDistance = new createjs.Text("", View.fontSetNormal);
        this.txtCommDistance.textAlign = "left";
        this.txtCommDistance.textBaseline = "top";
        this.texts.addChild(this.txtCommDistance);

        // upper limit to obtain stable connection
        this.txtCommStableRange = new createjs.Text("", View.fontSetNormal);
        this.txtCommStableRange.textAlign = "center";
        this.txtCommStableRange.textBaseline = "bottom";
        this.txtCommStableRange.x = this.outerCenter.x;
        this.texts.addChild(this.txtCommStableRange);
    }

    show(): void {
        this.shapeInner.scaleX = this.shapeInner.scaleY = this.outerSize / this.innerSize;

        this.shapeInner.graphics.clear();
        this.shapeInner.graphics.setStrokeStyle(this.toInner(View.strokeLineWidth));

        this.showSatellites(this.shapeInner.graphics);
        this.showBody(this.shapeInner.graphics);
    }

    private showBody(g: createjs.Graphics): void {
        // orbiting body
        g.beginFill(this.body.color)
            .drawCircle(this.innerCenter.x, this.innerCenter.y, this.body.radius)
            .endFill();

        // name of orbiting body
        this.txtBodyName.text = this.body.name;

        if (this.body.soi != Number.POSITIVE_INFINITY) {
            // sphere of influence
            g.beginStroke("yellow")
                .drawCircle(this.innerCenter.x, this.innerCenter.y, this.body.soi)
                .endStroke();

            // height of SoI
            this.txtBodySoI.text = "Sphere of Influence: " + this.body.soi.toLocaleString("en-US", { maximumFractionDigits: 3 }) + " km";
            this.txtBodySoI.y = this.outerCenter.y + Math.max(this.toOuter(this.body.soi) + View.marginText, this.toOuter(this.body.radius + this.satellites.altitude) + View.marginTextPushed);
        } else {
            this.txtBodySoI.text = "";
        }
    }

    private showSatellites(g: createjs.Graphics): void {
        // orbit
        g.beginStroke("black")
            .drawCircle(this.innerCenter.x, this.innerCenter.y, this.satellites.altitude + this.body.radius)
            .endStroke();

        this.txtSatAltitude.text = "Altitude: " + this.satellites.altitude.toLocaleString("en-US", { maximumFractionDigits: 3 }) + " km";
        this.txtSatAltitude.y = this.outerCenter.y + this.toOuter(this.satellites.altitude + this.body.radius) + View.marginText;

        // positions
        for (var i: number = 0; i < this.satellites.count; i++) {
            g.beginFill("black")
                .drawCircle(this.satellites.satPosition(i, this.innerSize).x, this.satellites.satPosition(i, this.innerSize).y, this.toInner(View.dotRadius))
                .endFill();
        }

        // communication area
        for (var i: number = 0; i < this.satellites.count; i++) {
            g.beginFill("rgba(255,0,0,0.1)")
                .drawCircle(this.satellites.satPosition(i, this.innerSize).x, this.satellites.satPosition(i, this.innerSize).y, this.satellites.antenna.range)
                .endFill();
        }

        // distance
        g.beginStroke(Communication.isNextSatConnectable(this.body, this.satellites, this.innerSize) ? "blue" : "red");
        GraphicsHelper.drawDualArrow(this.shapeInner.graphics,
            this.satellites.satPosition(0, this.innerSize).x, this.satellites.satPosition(0, this.innerSize).y,
            this.satellites.satPosition(1, this.innerSize).x, this.satellites.satPosition(1, this.innerSize).y, this.toInner(View.arrowSize))
            .endStroke();

        this.txtCommDistance.text = "Distance: " + this.satellites.satDistance().toLocaleString("en-US", { maximumFractionDigits: 3 }) + " km";
        this.txtCommDistance.x = this.toOuter(this.satellites.satPosition(0, this.innerSize).x + (this.satellites.satPosition(1, this.innerSize).x
            - this.satellites.satPosition(0, this.innerSize).x) / 2) + View.marginText / 2;
        this.txtCommDistance.y = this.toOuter(this.satellites.satPosition(0, this.innerSize).y + (this.satellites.satPosition(1, this.innerSize).y
            - this.satellites.satPosition(0, this.innerSize).y) / 2) + View.marginText / 2;

        // stable area
        if (Communication.hasStableArea(this.body, this.satellites, this.innerSize)) {
            // upper limit of stable area
            this.shapeInner.graphics.beginStroke("green")
                .drawCircle(this.innerCenter.x, this.innerCenter.y, this.satellites.stableRange() + this.body.radius)
                .endStroke();

            // range of stable area
            this.txtCommStableRange.text = "Stable: " + this.satellites.stableRange().toLocaleString("en-US", { maximumFractionDigits: 3 }) + " km";
            this.txtCommStableRange.y = this.outerCenter.y - this.toOuter(this.satellites.stableRange() + this.body.radius) - View.marginText;
        } else {
            this.txtCommStableRange.text = "";
        }
    }
}