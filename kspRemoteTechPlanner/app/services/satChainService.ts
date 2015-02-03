/// <reference path="../appreferences.ts" />

module App {
    export class SatChainService {
        'use strict';

        private _satChain: SatChain;

        static $inject = ["$cookieStore", "satChainCookieKey", "calc.euclideanServ", "calc.orbitalServ"];
        constructor(
            private $cookieStore: ng.cookies.ICookieStoreService,
            private cookieKey: string,
            private euclideanServ: Calculator.EuclideanService,
            private orbitalServ: Calculator.OrbitalService
            ) {

            this._satChain = this.loadOrCreate();
        }

        get satChain(): SatChain {
            return this._satChain;
        }

        private loadOrCreate(): SatChain {
            var sc: SatChain = this.$cookieStore.get(this.cookieKey);
            if (sc !== undefined)
                return sc;
            else
                return new SatChain(new Body("Kerbin", "rgb(63,111,40)", 600, 3531.6, 84159.286), 4, 1000, 0.029, new Antenna("Communotron 16", AntennaType.omni, 2500, 0.13), 70);
        }

        save() {
            this.$cookieStore.put(this.cookieKey, this.satChain);
        }

        satPosition(offset: number): Calculator.Point {
            var ra: number = this.satChain.body.radius + this.satChain.altitude;
            return new Calculator.Point(ra * Math.cos(2 * Math.PI / this.satChain.count * offset), + ra * Math.sin(2 * Math.PI / this.satChain.count * offset));
        }

        satDistance(): number {
            return this.satDistanceTo(1);
        }

        satDistanceTo(distance: number): number {
            return this.euclideanServ.length(this.satPosition(0), this.satPosition(distance));
        }

        isNextSatConnectable(): boolean {
            return this.canConnectToSat(1);
        }

        canConnectToSat(distance: number): boolean {
            return this.satChain.count >= distance + 1 && // connecting satellite exists
                this.euclideanServ.length(this.satPosition(0), this.satPosition(distance)) <= this.satChain.antenna.range && // connection range is enough 
                this.euclideanServ.distPointLine(new Calculator.Point(0, 0), this.satPosition(0), this.satPosition(distance))
                > this.satChain.body.radius; // connection is not blocked by primary body
        }

        hasStableArea(): boolean {
            return this.satChain.count >= 3 && this.isNextSatConnectable(); // at least 3 satellites and they can connect to next one
        }

        stableLimitAltitude(): number {
            return this.euclideanServ.circleCross(new Calculator.Point(0, 0), this.satPosition(0), this.satPosition(1),
                this.satChain.antenna.range, Calculator.CircleCrossMode.high) - this.satChain.body.radius;
        }

        orbitalPeriod(): number {
            return this.orbitalServ.period(this.satChain.body.radius, this.satChain.altitude, this.satChain.body.stdGravity);
        }

        nightTime(): number {
            return this.orbitalServ.nightTime(this.satChain.body.radius, this.satChain.altitude, this.satChain.body.stdGravity);
        }

        requiredBattery(): number {
            return (this.satChain.elcNeeded + this.satChain.antenna.elcNeeded) * this.nightTime();
        }

        requiredGenerator(): number {
            return (this.satChain.elcNeeded + this.satChain.antenna.elcNeeded) * this.orbitalPeriod() / (this.orbitalPeriod() - this.nightTime());
        }

        hohmannStartDeltaV(): number {
            return this.orbitalServ.hohmannStartDV(this.satChain.body.radius, this.satChain.parkingAlt, this.satChain.altitude, this.satChain.body.stdGravity);
        }

        hohmannFinishDeltaV(): number {
            return this.orbitalServ.hohmannFinishDV(this.satChain.body.radius, this.satChain.parkingAlt, this.satChain.altitude, this.satChain.body.stdGravity);
        }

        slidePhaseAngle(): number {
            var periodLow: number = this.orbitalServ.period(this.satChain.body.radius, this.satChain.parkingAlt, this.satChain.body.stdGravity);
            var periodHigh: number = this.orbitalServ.period(this.satChain.body.radius, this.satChain.altitude, this.satChain.body.stdGravity);
            return this.orbitalServ.slidePhaseAngle(360 / this.satChain.count, periodLow, periodHigh);
        }

        slidePhaseTime(): number {
            return this.slidePhaseAngle() / 360 * this.orbitalServ.period(this.satChain.body.radius, this.satChain.parkingAlt, this.satChain.body.stdGravity);
        }
    }
}
