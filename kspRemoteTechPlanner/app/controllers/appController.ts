/// <reference path="../appreferences.ts" />

module App {
    export class AppController {
        'use strict';

        static $inject = ["entireViewServ", "nightViewServ", "deltavViewServ"];
        constructor(
            private entireViewServ: EntireViewService,
            private nightViewServ: NightViewService,
            private deltavViewServ: DeltavViewService
            ) {

        }

        updateView() {
            this.entireViewServ.show();
            this.nightViewServ.show();
            this.deltavViewServ.show();
        }
    }
}
