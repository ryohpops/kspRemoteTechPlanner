/// <reference path="../../_references.ts" />

module App {
    'use strict';

    export function foldingDetail(): angular.IDirective {
        return {
            templateUrl: "app/directives/foldingDiv/foldingDetailTemplate.html",
            transclude: true,
            scope: {}
        };
    }
}
