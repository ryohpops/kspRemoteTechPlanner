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

        updateBody() {
            this.satChain.body = this.bodies.getBody(this.satChain.body.name);
        }

        updateAntenna(index: number) {
            this.satChain.antennas[index] = this.antennas.getAntenna(this.satChain.antennas[index].name);
        }
    }
}
