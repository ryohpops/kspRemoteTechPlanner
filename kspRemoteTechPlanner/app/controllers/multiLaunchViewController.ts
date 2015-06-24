/// <reference path="../_references.ts" />

module App {
    'use strict';

    import calcOrb = Calculator.Orbital;

    export class MultiLaunchViewController {
        sc: SatChain;
        body: Body;
        get higherPeriod(): number {
            return calcOrb.period(this.body.radius + this.sc.altitude, this.body.stdGravity) * (this.sc.count + 1) / this.sc.count;
        }
        get ap(): number {
            return calcOrb.sma(this.body.stdGravity, this.higherPeriod) * 2 - (this.sc.altitude + this.body.radius * 2);
        }
        get lowerPeriod(): number {
            return calcOrb.period(this.body.radius + this.sc.altitude, this.body.stdGravity) * (this.sc.count - 1) / this.sc.count;
        }
        get pe(): number {
            return calcOrb.sma(this.body.stdGravity, this.lowerPeriod) * 2 - (this.sc.altitude + this.body.radius * 2);
        }
        get higherDV(): number {
            return calcOrb.hohmannStartDV(this.body.radius + this.sc.altitude, this.body.radius + this.ap, this.body.stdGravity);
        }
        get lowerDV(): number {
            return calcOrb.hohmannStartDV(this.body.radius + this.sc.altitude, this.body.radius + this.pe, this.body.stdGravity);
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
