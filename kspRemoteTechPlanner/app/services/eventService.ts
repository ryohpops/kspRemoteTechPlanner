﻿/// <reference path="../_references.ts" />

module App {
    export class Events {
        static updateBody: string = "updateBody";
        static updateAntenna: string = "updateAntenna";
        static updateView: string = "updateView";
    }

    export class EventService {
        'use strict';

        static $inject = ["$rootScope"];
        constructor(
            private $rootScope: angular.IRootScopeService
            ) {

        }

        on(event: string, fn: (event: angular.IAngularEvent) => any) {
            this.$rootScope.$on(event, fn);
        }

        updateBody() {
            this.$rootScope.$emit(Events.updateBody);
        }

        updateAntenna() {
            this.$rootScope.$emit(Events.updateAntenna);
        }

        updateView() {
            this.$rootScope.$emit(Events.updateView);
        }
    }
}
