/// <reference path="../appreferences.ts" />
module App {
    export class AppController {
        'use strict';

        static $inject = ["entireViewServ"];
        constructor(
            private entireViewServ: EntireViewService
            ) {

        }

        show() {
            this.entireViewServ.show();
        }
    }
}
