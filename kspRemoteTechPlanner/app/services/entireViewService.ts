/// <reference path="../appreferences.ts" />

module App {
    export class EntireViewService extends ViewService {
        'use strict';

        private shape: createjs.Shape;
        private txtBodyName: createjs.Text;
        private txtBodySoI: createjs.Text;
        private txtSatAltitude: createjs.Text;
        private txtCommDistance: createjs.Text;
        private txtCommDistance2: createjs.Text;
        private txtCommStableRange: createjs.Text;

        static $inject = ["entireViewTarget", "graphicsHelperServ", "satChainServ"];
        constructor(
            private entireViewTarget: string,
            private gHelper: GraphicsHelperService,
            private satChainServ: SatChainService
            ) {

            super();
        }

        init() {
            super.init(this.entireViewTarget, 10000, 850);

            this.shape = new createjs.Shape();
            this.shapeContainer.addChild(this.shape);

            // name of orbiting body
            this.txtBodyName = new createjs.Text("", ViewService.fontSetBig);
            this.txtBodyName.textAlign = "center";
            this.txtBodyName.textBaseline = "middle";
            this.txtBodyName.x = this.center.x;
            this.txtBodyName.y = this.center.y;
            this.textContainer.addChild(this.txtBodyName);

            // sphere of influence
            this.txtBodySoI = new createjs.Text("", ViewService.fontSetNormal);
            this.txtBodySoI.textAlign = "center";
            this.txtBodySoI.textBaseline = "top";
            this.txtBodySoI.x = this.center.x;
            this.textContainer.addChild(this.txtBodySoI);

            // altitude of satChainServ
            this.txtSatAltitude = new createjs.Text("", ViewService.fontSetNormal);
            this.txtSatAltitude.textAlign = "center";
            this.txtSatAltitude.textBaseline = "top";
            this.txtSatAltitude.x = this.center.x;
            this.textContainer.addChild(this.txtSatAltitude);

            // distance between one of satChainServ and next one
            this.txtCommDistance = new createjs.Text("", ViewService.fontSetNormal);
            this.txtCommDistance.textAlign = "left";
            this.txtCommDistance.textBaseline = "top";
            this.textContainer.addChild(this.txtCommDistance);

            // distance between one of satChainServ and the one after the next
            this.txtCommDistance2 = new createjs.Text("", ViewService.fontSetNormal);
            this.txtCommDistance2.textAlign = "right";
            this.txtCommDistance2.textBaseline = "down";
            this.textContainer.addChild(this.txtCommDistance2);

            // upper limit to obtain stable connection
            this.txtCommStableRange = new createjs.Text("", ViewService.fontSetNormal);
            this.txtCommStableRange.textAlign = "center";
            this.txtCommStableRange.textBaseline = "bottom";
            this.txtCommStableRange.x = this.center.x;
            this.textContainer.addChild(this.txtCommStableRange);

            this.show();
        }

        show(): void {
            var sc: SatChain = this.satChainServ.satChain;

            this.virtualSize = (sc.body.radius + sc.altitude + sc.antenna.range) * 2 * 1.05;

            this.shape.graphics.clear();
            this.shape.graphics.setStrokeStyle(ViewService.strokeLineWidth);

            this.showSatChain(this.shape.graphics, this.satChainServ);
            this.showBody(this.shape.graphics, this.satChainServ);
            this.update();
        }

        private showBody(g: createjs.Graphics, s: SatChainService): void {
            var sc: SatChain = s.satChain;
            var b: Body = sc.body;

            // orbiting body
            g.beginFill(b.color)
                .drawCircle(this.center.x, this.center.y, this.toReal(b.radius))
                .endFill();

            // name of orbiting body
            this.txtBodyName.text = b.name;

            // sphere of influence
            if (b.soi != Number.POSITIVE_INFINITY) {
                // limit of SoI
                g.beginStroke("yellow")
                    .drawCircle(this.center.x, this.center.y, this.toReal(b.soi - b.radius))
                    .endStroke();

                // height of SoI
                this.txtBodySoI.text = "Sphere of Influence: " + (b.soi - b.radius).toLocaleString("en", ViewService.localeSetting) + " km";
                this.txtBodySoI.y = this.center.y + Math.max(this.toReal(b.soi - b.radius) + ViewService.marginText, this.toReal(b.radius + sc.altitude) + ViewService.marginTextPushed);
                this.txtBodySoI.visible = true;
            } else {
                this.txtBodySoI.visible = false;
            }
        }

        private showSatChain(g: createjs.Graphics, s: SatChainService): void {
            var sc: SatChain = s.satChain;
            var b: Body = sc.body;
            var a: Antenna = sc.antenna;

            // orbit
            g.beginStroke("black")
                .drawCircle(this.center.x, this.center.y, this.toReal(sc.altitude + b.radius))
                .endStroke();

            this.txtSatAltitude.text = "Altitude: " + sc.altitude.toLocaleString("en", ViewService.localeSetting) + " km";
            this.txtSatAltitude.y = this.center.y + this.toReal(sc.altitude + b.radius) + ViewService.marginText;

            // positions
            for (var i: number = 0; i < sc.count; i++) {
                g.beginFill("black")
                    .drawCircle(this.center.x + this.toReal(s.satPosition(i).x), this.center.y + this.toReal(s.satPosition(i).y), ViewService.dotRadius)
                    .endFill();
            }

            // communication area
            for (var i: number = 0; i < sc.count; i++) {
                g.beginFill("rgba(255,0,0,0.1)")
                    .drawCircle(this.center.x + this.toReal(s.satPosition(i).x), this.center.y + this.toReal(s.satPosition(i).y), this.toReal(a.range))
                    .endFill();
            }

            // distance
            g.beginStroke(s.isNextSatConnectable() ? "blue" : "red");
            this.gHelper.drawDualArrow(this.shape.graphics,
                this.center.x + this.toReal(s.satPosition(0).x), this.center.y + this.toReal(s.satPosition(0).y),
                this.center.x + this.toReal(s.satPosition(1).x), this.center.y + this.toReal(s.satPosition(1).y), ViewService.arrowSize)
                .endStroke();

            this.txtCommDistance.text = "Distance: " + s.satDistance().toLocaleString("en", ViewService.localeSetting) + " km";
            this.txtCommDistance.x = this.center.x + this.toReal((s.satPosition(0).x + s.satPosition(1).x) / 2) + ViewService.marginText / 2;
            this.txtCommDistance.y = this.center.y + this.toReal((s.satPosition(0).y + s.satPosition(1).y) / 2) + ViewService.marginText / 2;

            if (sc.count > 4) {
                g.beginStroke(s.canConnectToSat(2) ? "blue" : "red");
                this.gHelper.drawDualArrow(this.shape.graphics,
                    this.center.x + this.toReal(s.satPosition(0).x), this.center.y + this.toReal(s.satPosition(0).y),
                    this.center.x + this.toReal(s.satPosition(2).x), this.center.y + this.toReal(s.satPosition(2).y), ViewService.arrowSize)
                    .endStroke();

                this.txtCommDistance2.text = "Distance: " + s.satDistanceTo(2).toLocaleString("en", ViewService.localeSetting) + " km";
                this.txtCommDistance2.x = this.center.x + this.toReal((s.satPosition(0).x + s.satPosition(2).x) / 2) - ViewService.marginText / 2;
                this.txtCommDistance2.y = this.center.y + this.toReal((s.satPosition(0).y + s.satPosition(2).y) / 2) - ViewService.marginText / 2;
                this.txtCommDistance2.visible = true;
            } else {
                // any arrows should not be drawn.
                this.txtCommDistance2.visible = false;
            }

            // stable area
            if (s.hasStableArea()) {
                // upper limit of stable area
                this.shape.graphics.beginStroke("green")
                    .drawCircle(this.center.x, this.center.y, this.toReal(s.stableLimitAltitude() + b.radius))
                    .endStroke();

                // range of stable area
                this.txtCommStableRange.text = "Stable: " + s.stableLimitAltitude().toLocaleString("en", ViewService.localeSetting) + " km";
                this.txtCommStableRange.y = this.center.y - this.toReal(s.stableLimitAltitude() + b.radius) - ViewService.marginText;
            } else {
                this.txtCommStableRange.text = "";
            }
        }
    }
}
