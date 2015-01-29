/// <reference path="../appreferences.ts" />
module App {
    export class EntireViewService extends ViewService {
        'use strict';

        private shapeInner: createjs.Shape;
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

            super(entireViewTarget, 10000, 840);

            // shape for drawing in inner coordinates
            this.shapeInner = new createjs.Shape();
            this.shapeContainer.addChild(this.shapeInner);

            // name of orbiting body
            this.txtBodyName = new createjs.Text("", ViewService.fontSetBig);
            this.txtBodyName.textAlign = "center";
            this.txtBodyName.textBaseline = "middle";
            this.txtBodyName.x = this.realCenter.x;
            this.txtBodyName.y = this.realCenter.y;
            this.textContainer.addChild(this.txtBodyName);

            // sphere of influence
            this.txtBodySoI = new createjs.Text("", ViewService.fontSetNormal);
            this.txtBodySoI.textAlign = "center";
            this.txtBodySoI.textBaseline = "top";
            this.txtBodySoI.x = this.realCenter.x;
            this.textContainer.addChild(this.txtBodySoI);

            // altitude of satChainServ
            this.txtSatAltitude = new createjs.Text("", ViewService.fontSetNormal);
            this.txtSatAltitude.textAlign = "center";
            this.txtSatAltitude.textBaseline = "top";
            this.txtSatAltitude.x = this.realCenter.x;
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
            this.txtCommStableRange.x = this.realCenter.x;
            this.textContainer.addChild(this.txtCommStableRange);

            this.show();
        }

        show(): void {
            var sc: SatChain = this.satChainServ.satChain;

            this.virtualSize = (sc.body.radius + sc.altitude + sc.antenna.range) * 2 * 1.05;
            this.shapeInner.scaleX = this.shapeInner.scaleY = this.realSize / this.virtualSize;

            this.shapeInner.graphics.clear();
            this.shapeInner.graphics.setStrokeStyle(this.toVirtual(ViewService.strokeLineWidth));

            this.showSatChain(this.shapeInner.graphics, this.satChainServ);
            this.showBody(this.shapeInner.graphics, this.satChainServ);
            this.update();
        }

        private showBody(g: createjs.Graphics, s: SatChainService): void {
            var sc: SatChain = s.satChain;
            var b: Body = sc.body;

            // orbiting body
            g.beginFill(b.color)
                .drawCircle(this.virtualCenter.x, this.virtualCenter.y, b.radius)
                .endFill();

            // name of orbiting body
            this.txtBodyName.text = b.name;

            // sphere of influence
            if (b.soi != Number.POSITIVE_INFINITY) {
                // limit of SoI
                g.beginStroke("yellow")
                    .drawCircle(this.virtualCenter.x, this.virtualCenter.y, b.soi - b.radius)
                    .endStroke();

                // height of SoI
                this.txtBodySoI.text = "Sphere of Influence: " + (b.soi - b.radius).toLocaleString("en", ViewService.localeSetting) + " km";
                this.txtBodySoI.y = this.realCenter.y + Math.max(this.toReal(b.soi - b.radius) + ViewService.marginText, this.toReal(b.radius + sc.altitude) + ViewService.marginTextPushed);
            } else {
                this.txtBodySoI.text = "";
            }
        }

        private showSatChain(g: createjs.Graphics, s: SatChainService): void {
            var sc: SatChain = s.satChain;
            var b: Body = sc.body;
            var a: Antenna = sc.antenna;

            // orbit
            g.beginStroke("black")
                .drawCircle(this.virtualCenter.x, this.virtualCenter.y, sc.altitude + b.radius)
                .endStroke();

            this.txtSatAltitude.text = "Altitude: " + sc.altitude.toLocaleString("en", ViewService.localeSetting) + " km";
            this.txtSatAltitude.y = this.realCenter.y + this.toReal(sc.altitude + b.radius) + ViewService.marginText;

            // positions
            for (var i: number = 0; i < sc.count; i++) {
                g.beginFill("black")
                    .drawCircle(this.virtualCenter.x + s.satPosition(i).x, this.virtualCenter.y + s.satPosition(i).y, this.toVirtual(ViewService.dotRadius))
                    .endFill();
            }

            // communication area
            for (var i: number = 0; i < sc.count; i++) {
                g.beginFill("rgba(255,0,0,0.1)")
                    .drawCircle(this.virtualCenter.x + s.satPosition(i).x, this.virtualCenter.y + s.satPosition(i).y, a.range)
                    .endFill();
            }

            // distance
            g.beginStroke(s.isNextSatConnectable() ? "blue" : "red");
            this.gHelper.drawDualArrow(this.shapeInner.graphics,
                this.virtualCenter.x + s.satPosition(0).x, this.virtualCenter.y + s.satPosition(0).y,
                this.virtualCenter.x + s.satPosition(1).x, this.virtualCenter.y + s.satPosition(1).y, this.toVirtual(ViewService.arrowSize))
                .endStroke();

            this.txtCommDistance.text = "Distance: " + s.satDistance().toLocaleString("en", ViewService.localeSetting) + " km";
            this.txtCommDistance.x = this.realCenter.x + this.toReal((s.satPosition(0).x + s.satPosition(1).x) / 2) + ViewService.marginText / 2;
            this.txtCommDistance.y = this.realCenter.y + this.toReal((s.satPosition(0).y + s.satPosition(1).y) / 2) + ViewService.marginText / 2;

            if (sc.count > 4) {
                g.beginStroke(s.canConnectToSat(2) ? "blue" : "red");
                this.gHelper.drawDualArrow(this.shapeInner.graphics,
                    this.virtualCenter.x + s.satPosition(0).x, this.virtualCenter.y + s.satPosition(0).y,
                    this.virtualCenter.x + s.satPosition(2).x, this.virtualCenter.y + s.satPosition(2).y, this.toVirtual(ViewService.arrowSize))
                    .endStroke();

                this.txtCommDistance2.text = "Distance: " + s.satDistanceTo(2).toLocaleString("en", ViewService.localeSetting) + " km";
                this.txtCommDistance2.x = this.realCenter.x + this.toReal((s.satPosition(0).x + s.satPosition(2).x) / 2) - ViewService.marginText / 2;
                this.txtCommDistance2.y = this.realCenter.y + this.toReal((s.satPosition(0).y + s.satPosition(2).y) / 2) - ViewService.marginText / 2;
                this.txtCommDistance2.visible = true;
            } else {
                // any arrows should not be drawn.
                this.txtCommDistance2.visible = false;
            }

            // stable area
            if (s.hasStableArea()) {
                // upper limit of stable area
                this.shapeInner.graphics.beginStroke("green")
                    .drawCircle(this.virtualCenter.x, this.virtualCenter.y, s.stableLimitAltitude() + b.radius)
                    .endStroke();

                // range of stable area
                this.txtCommStableRange.text = "Stable: " + s.stableLimitAltitude().toLocaleString("en", ViewService.localeSetting) + " km";
                this.txtCommStableRange.y = this.realCenter.y - this.toReal(s.stableLimitAltitude() + b.radius) - ViewService.marginText;
            } else {
                this.txtCommStableRange.text = "";
            }
        }
    }
}
