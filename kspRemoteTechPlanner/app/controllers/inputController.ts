/// <reference path="../appreferences.ts" />
module App {
    export class InputController {
        'use strict';

        satChain: SatChain;

        static $inject = ["satChainServ"];
        constructor(
            private satChainServ: SatChainService
            ) {

            this.satChain = this.satChainServ.satChain;
        }

        save() {
            this.satChainServ.save();
        }
    }
}