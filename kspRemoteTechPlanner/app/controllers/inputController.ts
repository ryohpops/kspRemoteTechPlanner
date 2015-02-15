/// <reference path="../appreferences.ts" />

module App {
    export class InputController {
        'use strict';

        satChain: SatChain;
        antennaType: typeof AntennaType;

        static $inject = ["satChainServ", "bodyStorageServ", "antennaStorageServ"];
        constructor(
            private satChainServ: SatChainService,
            private bodies: BodyStorageService,
            private antennas: AntennaStorageService
            ) {

            this.satChain = this.satChainServ.satChain;
            this.antennaType = AntennaType;
        }

        save() {
            this.satChainServ.save();
        }

        pullBody(name: string) {
            this.satChain.body = this.bodies.getBody(name);
        }

        pullAntenna(index: number, name: string) {
            this.satChain.antennas[index] = this.antennas.getAntenna(name);
        }
    }
}
