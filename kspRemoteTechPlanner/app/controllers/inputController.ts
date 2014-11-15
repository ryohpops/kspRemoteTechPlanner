/// <reference path="../appreferences.ts" />
module App {
    export class InputController {
        'use strict';

        satChain: SatChain;

        static $inject = ["satChainServ", "bodyStorageServ", "antennaStorageServ"];
        constructor(
            private satChainServ: SatChainService,
            private bodies: BodyStorageService,
            private antennas: AntennaStorageService
            ) {

            this.satChain = this.satChainServ.satChain;
        }

        save() {
            this.satChainServ.save();
        }
    }
}