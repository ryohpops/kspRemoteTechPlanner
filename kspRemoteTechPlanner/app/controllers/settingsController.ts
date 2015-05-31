/// <reference path="../_references.ts" />

module App {
    'use strict';

    export class SettingsController {
        settings: Settings;

        $inject = ["settingsServ"];
        constructor(
            private settingsServ: SettingsService
            ) {

            this.settings = this.settingsServ.settings;
        }
    }
}
