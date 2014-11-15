/// <reference path="../appReferences.ts" />
module App {
    export class SatChainService {
        'use strict';

        private _satChain: SatChain;

        static $inject = ["$cookieStore", "satChainCookieKey", "calculator.euclidean", "calculator.orbital"];
        constructor(
            private $cookieStore: ng.cookies.ICookieStoreService,
            private cookieKey: string,
            private euclidean: Calculator.EuclideanService,
            private orbital: Calculator.OrbitalService
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
                return new SatChain(new Body("kerbin", "test", 600, 3531.6, 8000), 4, 1000, 0.029, new Antenna("Communotron 16", AntennaType.omni, 5000, 1), 70);
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
            return this.euclidean.length(this.satPosition(0), this.satPosition(distance));
        }

        isNextSatConnectable(): boolean {
            return this.canConnectToSat(1);
        }

        canConnectToSat(distance: number): boolean {
            return this.satChain.count >= distance + 1 && // connecting satellite exists
                this.euclidean.length(this.satPosition(0), this.satPosition(distance)) <= this.satChain.antenna.range && // connection range is enough 
                this.euclidean.distPointLine(new Calculator.Point(0, 0), this.satPosition(0), this.satPosition(distance))
                > this.satChain.body.radius; // connection is not blocked by primary body
        }

        hasStableArea(): boolean {
            return this.satChain.count >= 3 && this.isNextSatConnectable(); // at least 3 satellites and they can connect to next one
        }

        stableLimitAltitude(): number {
            return this.euclidean.circleCross(new Calculator.Point(0, 0), this.satPosition(0), this.satPosition(1),
                this.satChain.antenna.range, Calculator.CircleCrossMode.high) - this.satChain.body.radius;
        }

        orbitalPeriod(): number {
            return this.orbital.period(this.satChain.body.radius, this.satChain.altitude, this.satChain.body.stdGravity);
        }

        nightTime(): number {
            return this.orbital.nightTime(this.satChain.body.radius, this.satChain.altitude, this.satChain.body.stdGravity);
        }

        requiredBattery(): number {
            return (this.satChain.elcNeeded + this.satChain.antenna.elcNeeded) * this.nightTime();
        }

        requiredGenerator(): number {
            return (this.satChain.elcNeeded + this.satChain.antenna.elcNeeded) * this.orbitalPeriod() / (this.orbitalPeriod() - this.nightTime());
        }

        hohmannStartDeltaV(): number {
            return this.orbital.hohmannStartDV(this.satChain.body.radius, this.satChain.parkingAlt, this.satChain.altitude, this.satChain.body.stdGravity);
        }

        hohmannFinishDeltaV(): number {
            return this.orbital.hohmannFinishDV(this.satChain.body.radius, this.satChain.parkingAlt, this.satChain.altitude, this.satChain.body.stdGravity);
        }

        slidePhaseAngle(): number {
            var periodLow: number = this.orbital.period(this.satChain.body.radius, this.satChain.parkingAlt, this.satChain.body.stdGravity);
            var periodHigh: number = this.orbital.period(this.satChain.body.radius, this.satChain.altitude, this.satChain.body.stdGravity);
            return this.orbital.slidePhaseAngle(360 / this.satChain.count, periodLow, periodHigh);
        }

        slidePhaseTime(): number {
            return this.slidePhaseAngle() / 360 * this.orbital.period(this.satChain.body.radius, this.satChain.parkingAlt, this.satChain.body.stdGravity);
        }
    }
}
