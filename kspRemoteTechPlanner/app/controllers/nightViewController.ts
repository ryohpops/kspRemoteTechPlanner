/// <reference path="../appreferences.ts" />

module App {
    export class NightViewController {
        'use strict';

        sc: SatChain;
        body: Body;
        get period(): number {
            return this.orbitalServ.period(this.body.radius + this.sc.altitude, this.body.stdGravity);
        }
        get nightTime(): number {
            return this.orbitalServ.nightTime(this.body.radius, this.body.radius + this.sc.altitude, this.body.stdGravity);
        }
        get reqGen(): number {
            var ae: number[] = [], aq: number[] = [];
            for (var index in this.sc.antennas) {
                ae.push(this.sc.antennas[index].antenna.elcNeeded);
                aq.push(this.sc.antennas[index].quantity);
            }

            return this.satelliteServ.requiredGenerator(this.sc.elcNeeded, ae, aq, this.body.radius, this.body.stdGravity, this.body.radius + this.sc.altitude);
        }
        get reqBatt(): number {
            var ae: number[] = [], aq: number[] = [];
            for (var index in this.sc.antennas) {
                ae.push(this.sc.antennas[index].antenna.elcNeeded);
                aq.push(this.sc.antennas[index].quantity);
            }

            return this.satelliteServ.requiredBattery(this.sc.elcNeeded, ae, aq, this.body.radius, this.body.stdGravity, this.body.radius + this.sc.altitude);
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
