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

        this.showSatellites(this.shapeInner.graphics, this.satellites, this.satellites.body, this.satellites.antenna);
        this.showBody(this.shapeInner.graphics, this.satellites, this.satellites.body);
    }

    private showBody(g: createjs.Graphics, s: Satellites, b: Body): void {
        // orbiting body
        g.beginFill(b.color)
            .drawCircle(this.innerCenter.x, this.innerCenter.y, b.radius)
            .endFill();

        // name of orbiting body
        this.txtBodyName.text = b.name;

        if (b.soi != Number.POSITIVE_INFINITY) {
            // sphere of influence
            g.beginStroke("yellow")
                .drawCircle(this.innerCenter.x, this.innerCenter.y, b.soi)
                .endStroke();

            // height of SoI
            this.txtBodySoI.text = "Sphere of Influence: " + b.soi.toLocaleString("en-US", { maximumFractionDigits: 3 }) + " km";
            this.txtBodySoI.y = this.outerCenter.y + Math.max(this.toOuter(b.soi) + View.marginText, this.toOuter(b.radius + s.altitude) + View.marginTextPushed);
        } else {
            this.txtBodySoI.text = "";
        }
    }

    private showSatellites(g: createjs.Graphics, s: Satellites, b: Body, a: Antenna): void {
        // orbit
        g.beginStroke("black")
            .drawCircle(this.innerCenter.x, this.innerCenter.y, s.altitude + b.radius)
            .endStroke();

        this.txtSatAltitude.text = "Altitude: " + s.altitude.toLocaleString("en-US", { maximumFractionDigits: 3 }) + " km";
        this.txtSatAltitude.y = this.outerCenter.y + this.toOuter(s.altitude + b.radius) + View.marginText;

        // positions
        for (var i: number = 0; i < s.count; i++) {
            g.beginFill("black")
                .drawCircle(s.satPosition(i, this.innerSize).x, s.satPosition(i, this.innerSize).y, this.toInner(View.dotRadius))
                .endFill();
        }

        // communication area
        for (var i: number = 0; i < s.count; i++) {
            g.beginFill("rgba(255,0,0,0.1)")
                .drawCircle(s.satPosition(i, this.innerSize).x, s.satPosition(i, this.innerSize).y, a.range)
                .endFill();
        }

        // distance
        g.beginStroke(Communication.isNextSatConnectable(b, s, this.innerSize) ? "blue" : "red");
        GraphicsHelper.drawDualArrow(this.shapeInner.graphics,
            s.satPosition(0, this.innerSize).x, s.satPosition(0, this.innerSize).y,
            s.satPosition(1, this.innerSize).x, s.satPosition(1, this.innerSize).y, this.toInner(View.arrowSize))
            .endStroke();

        this.txtCommDistance.text = "Distance: " + s.satDistance().toLocaleString("en-US", { maximumFractionDigits: 3 }) + " km";
        this.txtCommDistance.x = this.toOuter(s.satPosition(0, this.innerSize).x + (s.satPosition(1, this.innerSize).x
            - s.satPosition(0, this.innerSize).x) / 2) + View.marginText / 2;
        this.txtCommDistance.y = this.toOuter(s.satPosition(0, this.innerSize).y + (s.satPosition(1, this.innerSize).y
            - s.satPosition(0, this.innerSize).y) / 2) + View.marginText / 2;

        // stable area
        if (Communication.hasStableArea(b, s, this.innerSize)) {
            // upper limit of stable area
            this.shapeInner.graphics.beginStroke("green")
                .drawCircle(this.innerCenter.x, this.innerCenter.y, s.stableRange() + b.radius)
                .endStroke();

            // range of stable area
            this.txtCommStableRange.text = "Stable: " + s.stableRange().toLocaleString("en-US", { maximumFractionDigits: 3 }) + " km";
            this.txtCommStableRange.y = this.outerCenter.y - this.toOuter(s.stableRange() + b.radius) - View.marginText;
        } else {
            this.txtCommStableRange.text = "";
        }
    }
}