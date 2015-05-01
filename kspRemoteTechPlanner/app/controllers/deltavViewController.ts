/// <reference path="../_references.ts" />

module App {
    import calcOrb = Calculator.Orbital;

    export class DeltavViewController {
        'use strict';

        sc: SatChain;
        body: Body;
        get startDV(): number {
            return calcOrb.hohmannStartDV(this.body.radius + this.sc.parkingAlt, this.body.radius + this.sc.altitude, this.body.stdGravity) * 1000;
        }
        get finishDV(): number {
            return calcOrb.hohmannFinishDV(this.body.radius + this.sc.parkingAlt, this.body.radius + this.sc.altitude, this.body.stdGravity) * 1000;
        }
        get slideAngle(): number {
            var lowPeriod: number = calcOrb.period(this.body.radius + this.sc.parkingAlt, this.body.stdGravity);
            var highPeriod: number = calcOrb.period(this.body.radius + this.sc.altitude, this.body.stdGravity);
            return calcOrb.slidePhaseAngle(360 / this.sc.count, lowPeriod, highPeriod);
        }
        get slideTime(): number {
            return (this.slideAngle / 360) * calcOrb.period(this.body.radius + this.sc.parkingAlt, this.body.stdGravity);
        }

        static $inject = ["satChainServ"];
        constructor(
            private satChainServ: SatChainService
            ) {

            this.sc = this.satChainServ.satChain;
            this.body = this.sc.body;
        }
    }
}
