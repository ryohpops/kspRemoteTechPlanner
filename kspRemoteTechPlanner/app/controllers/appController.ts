/// <reference path="../appreferences.ts" />
module App {
    export class AppController {
        'use strict';

        static $inject = ["entireViewServ", "nightViewServ"];
        constructor(
            private entireViewServ: EntireViewService,
            private nightViewServ: NightViewService
            ) {

        }

        show() {
            this.entireViewServ.show();
            this.nightViewServ.show();
        }
    }
}
