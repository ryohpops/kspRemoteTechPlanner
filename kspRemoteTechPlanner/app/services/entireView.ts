/// <reference path="../appreferences.ts" />
module App {
    export class EntireView {
        'use strict';

        static $inject = ["$element", "satChainServ"];
        constructor(
            private $element: JQuery,
            private satChainServ: SatChainService
            ) {

        }
    }
}
