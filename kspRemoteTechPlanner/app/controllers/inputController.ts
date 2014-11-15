/// <reference path="../appreferences.ts" />
module App {
    export class InputController {
        'use strict';

        static $inject = ["$scope", "satChainServ"];
        constructor(
            private $scope: ng.IScope,
            private satChainServ: SatChainService
            ) {

        }
    }
}