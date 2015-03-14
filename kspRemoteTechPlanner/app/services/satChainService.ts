/// <reference path="../appreferences.ts" />

module App {
    import Point = Calculator.Point;

    export class SatChainService extends DataService<SatChain> {
        'use strict';

        private static defaultData: SatChain = {
            body: { name: "Kerbin", color: "rgb(63,111,40)", radius: 600, stdGravity: 3531.6, soi: 84159.286 },
            count: 4, altitude: 1000, elcNeeded: 0.029,
            antennas: [{ antenna: { name: "Communotron 16", type: AntennaType.omni, range: 2500, elcNeeded: 0.13 }, quantity: 1 }],
            antennaIndex: 0, parkingAlt: 70
        };
        private static dataKey: string = "inputData";
        private static versionKey: string = "inputDataVersion";
        private static modelVersion: number = 1;

        private _satChain: SatChain;
        get satChain(): SatChain { return this._satChain; }

        static $inject = ["$cookieStore", "localStorageService", "calc.euclideanServ", "calc.orbitalServ"];
        constructor(
            $cookieStore: ng.cookies.ICookieStoreService,
            localStorage: ng.local.storage.ILocalStorageService<any>,
            private euclideanServ: Calculator.EuclideanService,
            private orbitalServ: Calculator.OrbitalService
            ) {

            super($cookieStore, localStorage, SatChainService.defaultData, SatChainService.dataKey,
                SatChainService.versionKey, SatChainService.modelVersion, satChainServiceUpdater);
            this._satChain = this.data;
        }

        get selectedAntenna(): Antenna {
            return this.satChain.antennas[this.satChain.antennaIndex].antenna;
        }

        // Functions below here should be moved into any of view controller after refactoring of view services

        satPosition(offset: number): Point {
            var ra: number = this.satChain.body.radius + this.satChain.altitude;
            return new Point(ra * Math.cos(2 * Math.PI / this.satChain.count * offset), ra * Math.sin(2 * Math.PI / this.satChain.count * offset));
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
                this.euclideanServ.length(this.satPosition(0), this.satPosition(distance)) <= this.selectedAntenna.range && // connection range is enough 
                this.euclideanServ.distPointLine(new Point(0, 0), this.satPosition(0), this.satPosition(distance))
                > this.satChain.body.radius; // connection is not blocked by primary body
        }

        hasStableArea(): boolean {
            return this.satChain.count >= 3 && this.isNextSatConnectable(); // at least 3 satellites and they can connect to next one
        }

        stableLimitAltitude(): number {
            return this.euclideanServ.circleCross(new Point(0, 0), this.satPosition(0), this.satPosition(1),
                this.selectedAntenna.range, Calculator.CircleCrossMode.high) - this.satChain.body.radius;
        }

        orbitalPeriod(): number {
            return this.orbitalServ.period(this.satChain.body.radius, this.satChain.altitude, this.satChain.body.stdGravity);
        }

        nightTime(): number {
            return this.orbitalServ.nightTime(this.satChain.body.radius, this.satChain.altitude, this.satChain.body.stdGravity);
        }

        private totalElcNeeded(): number {
            var elc: number = this.satChain.elcNeeded;
            for (var index in this.satChain.antennas) {
                var a: AntennaEquipment = this.satChain.antennas[index];
                elc += a.antenna.elcNeeded * a.quantity;
            }
            return elc;
        }

        requiredBattery(): number {
            return this.totalElcNeeded() * this.nightTime();
        }

        requiredGenerator(): number {
            return this.totalElcNeeded() * this.orbitalPeriod() / (this.orbitalPeriod() - this.nightTime());
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
