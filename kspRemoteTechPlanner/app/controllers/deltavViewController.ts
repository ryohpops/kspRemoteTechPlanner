/// <reference path="../appreferences.ts" />

module App {
    export class DeltavViewController {
        'use strict';

        sc: SatChain;
        body: Body;
        get startDV(): number {
            return this.orbitalServ.hohmannStartDV(this.body.radius, this.sc.parkingAlt, this.sc.altitude, this.body.stdGravity) * 1000;
        }
        get finishDV(): number {
            return this.orbitalServ.hohmannFinishDV(this.body.radius, this.sc.parkingAlt, this.sc.altitude, this.body.stdGravity) * 1000;
        }
        get slideAngle(): number {
            var lowPeriod: number = this.orbitalServ.period(this.body.radius, this.sc.parkingAlt, this.body.stdGravity);
            var highPeriod: number = this.orbitalServ.period(this.body.radius, this.sc.altitude, this.body.stdGravity);
            return this.orbitalServ.slidePhaseAngle(360 / this.sc.count, lowPeriod, highPeriod);
        }
        get slideTime(): number {
            return this.slideAngle * this.orbitalServ.period(this.body.radius, this.sc.parkingAlt, this.body.stdGravity);
        }

        static $inject = ["satChainServ", "calc.orbitalServ", "calc.satelliteServ"];
        constructor(
            private satChainServ: SatChainService,
            private orbitalServ: Calculator.OrbitalService,
            private satelliteServ: Calculator.SatelliteService
            ) {

            this.sc = this.satChainServ.satChain;
            this.body = this.sc.body;
        }
    }
}
