/// <reference path="../appreferences.ts" />

module App {
    import Point = Calculator.Point;

    export class SatChainService {
        'use strict';

        private static dataKey: string = "inputData";
        private static versionKey: string = "inputDataVersion";
        private static modelVersion: number = 1;

        private _satChain: SatChain;

        get satChain(): SatChain {
            return this._satChain;
        }

        static $inject = ["$cookieStore", "calc.euclideanServ", "calc.orbitalServ"];
        constructor(
            private $cookieStore: ng.cookies.ICookieStoreService,
            private euclideanServ: Calculator.EuclideanService,
            private orbitalServ: Calculator.OrbitalService
            ) {

            this._satChain = this.loadOrCreate();
            this.$cookieStore.put(SatChainService.versionKey, SatChainService.modelVersion);
        }

        private loadOrCreate(): SatChain {
            var sc: any = this.$cookieStore.get(SatChainService.dataKey); // JSON object
            var version: number = this.$cookieStore.get(SatChainService.versionKey);

            if (sc !== undefined) {
                var satChain: SatChain = satChainServiceUpdater(sc, version);

                var antennas: AntennaEquipment[] = new Array<AntennaEquipment>();
                for (var index in satChain.antennas) {
                    var ae: any = satChain.antennas[index];
                    antennas.push(new AntennaEquipment(new Antenna(ae.antenna.name, ae.antenna.type, ae.antenna.range, ae.antenna.elcNeeded), ae.quantity));
                }
                return new SatChain(new Body(satChain.body.name, satChain.body.color, satChain.body.radius, satChain.body.stdGravity, satChain.body.soi),
                    satChain.count, satChain.altitude, satChain.elcNeeded, antennas, satChain.antennaIndex, satChain.parkingAlt);
            } else {
                return new SatChain(new Body("Kerbin", "rgb(63,111,40)", 600, 3531.6, 84159.286), 4, 1000, 0.029,
                    [new AntennaEquipment(new Antenna("Communotron 16", AntennaType.omni, 2500, 0.13), 1)], 0, 70);
            }
        }

        save() {
            this.$cookieStore.put(SatChainService.dataKey, this.satChain);
        }

        satPosition(offset: number): Point {
            var ra: number = this.satChain.body.radius + this.satChain.altitude;
            return new Point(ra * Math.cos(2 * Math.PI / this.satChain.count * offset), + ra * Math.sin(2 * Math.PI / this.satChain.count * offset));
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
                this.euclideanServ.length(this.satPosition(0), this.satPosition(distance)) <= this.satChain.selectedAntenna.range && // connection range is enough 
                this.euclideanServ.distPointLine(new Point(0, 0), this.satPosition(0), this.satPosition(distance))
                > this.satChain.body.radius; // connection is not blocked by primary body
        }

        hasStableArea(): boolean {
            return this.satChain.count >= 3 && this.isNextSatConnectable(); // at least 3 satellites and they can connect to next one
        }

        stableLimitAltitude(): number {
            return this.euclideanServ.circleCross(new Point(0, 0), this.satPosition(0), this.satPosition(1),
                this.satChain.selectedAntenna.range, Calculator.CircleCrossMode.high) - this.satChain.body.radius;
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
                elc += this.satChain.antennas[index].elcNeeded;
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
