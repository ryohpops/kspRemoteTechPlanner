/// <reference path="../appreferences.ts" />
module App {
    export class NightViewService extends ViewService {
        'use strict';

        private static bodyRadius: number = 50;
        private static orbitRadius: number = 150;

        private shapeOuter: createjs.Shape;
        private txtOrbitalPeriod: createjs.Text;
        private txtRequiredGenerator: createjs.Text;
        private txtNightTime: createjs.Text;
        private txtRequiredBattery: createjs.Text;

        static $inject = ["nightViewTarget", "satChainServ"];
        constructor(
            private nightViewTarget: string,
            private satChainServ: SatChainService
            ) {

            super(nightViewTarget, 5000, 400);

            // shape for drawing in outer coordinates
            this.shapeOuter = new createjs.Shape();
            this.shapeContainer.addChild(this.shapeOuter);

            // orbital period
            this.txtOrbitalPeriod = new createjs.Text("", ViewService.fontSetNormal);
            this.txtOrbitalPeriod.textAlign = "center";
            this.txtOrbitalPeriod.textBaseline = "bottom";
            this.txtOrbitalPeriod.x = this.outerCenter.x;
            this.txtOrbitalPeriod.y = this.outerCenter.y - NightViewService.orbitRadius - ViewService.marginText;
            this.textContainer.addChild(this.txtOrbitalPeriod);

            // required generation amount of electricity
            this.txtRequiredGenerator = new createjs.Text("", ViewService.fontSetNormal);
            this.txtRequiredGenerator.textAlign = "center";
            this.txtRequiredGenerator.textBaseline = "top";
            this.txtRequiredGenerator.x = this.outerCenter.x;
            this.txtRequiredGenerator.y = this.outerCenter.y + NightViewService.orbitRadius + ViewService.marginText;
            this.textContainer.addChild(this.txtRequiredGenerator);

            // time of night
            this.txtNightTime = new createjs.Text("", ViewService.fontSetNormal);
            this.txtNightTime.textAlign = "right";
            this.txtNightTime.textBaseline = "bottom";
            this.txtNightTime.x = this.outerSize - ViewService.marginText;
            this.txtNightTime.y = this.outerCenter.y - NightViewService.bodyRadius - ViewService.marginText;
            this.textContainer.addChild(this.txtNightTime);

            // required battery capacity
            this.txtRequiredBattery = new createjs.Text("", ViewService.fontSetNormal);
            this.txtRequiredBattery.textAlign = "right";
            this.txtRequiredBattery.textBaseline = "top";
            this.txtRequiredBattery.x = this.outerSize - ViewService.marginText;
            this.txtRequiredBattery.y = this.outerCenter.y + NightViewService.bodyRadius + ViewService.marginText;
            this.textContainer.addChild(this.txtRequiredBattery);

            this.show();
        }

        show(): void {
            this.shapeOuter.graphics.clear();
            this.shapeOuter.graphics.setStrokeStyle(ViewService.strokeLineWidth);

            this.showFigures(this.shapeOuter.graphics, this.satChainServ);
            this.update();
        }

        private showFigures(g: createjs.Graphics, s: SatChainService) {
            var sc: SatChain = s.satChain;
            var b: Body = sc.body;

            // night area
            this.shapeOuter.graphics.beginFill("rgba(0,0,0,0.2)")
                .drawRect(this.outerCenter.x, this.outerCenter.y - NightViewService.bodyRadius, this.outerSize / 2, NightViewService.bodyRadius * 2)
                .endFill();

            // planet
            this.shapeOuter.graphics.beginFill(b.color)
                .drawCircle(this.outerCenter.x, this.outerCenter.y, NightViewService.bodyRadius)
                .endFill();

            // orbit
            this.shapeOuter.graphics.beginStroke("gray")
                .drawCircle(this.outerCenter.x, this.outerCenter.y, NightViewService.orbitRadius)
                .endStroke();

            // orbital period
            this.txtOrbitalPeriod.text = "Orbital period: " + s.orbitalPeriod().toLocaleString("en", ViewService.localeSetting) + " sec.";

            // night time
            this.txtNightTime.text = "Night time: " + s.nightTime().toLocaleString("en", ViewService.localeSetting) + " sec.";

            // required battery
            this.txtRequiredBattery.text = "Required Battery: " + s.requiredBattery().toLocaleString("en", ViewService.localeSetting);

            // required generator
            this.txtRequiredGenerator.text = "Required Generator: " + s.requiredGenerator().toLocaleString("en", ViewService.localeSetting) + " per sec.";
        }
    }
}
