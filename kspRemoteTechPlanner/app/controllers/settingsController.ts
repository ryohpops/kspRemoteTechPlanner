/// <reference path="../_references.ts" />

module App {
    'use strict';

    export class SettingsController {
        settings: Settings;

        static $inject = ["settingsServ", "storageServ"];
        constructor(
            private settingsServ: SettingsService,
            private storageServ: StorageService
            ) {

            this.settings = this.settingsServ.settings;
        }

        onChange() {
            this.settingsServ.save();
        }

        onResetConfirm() {
            this.storageServ.reset();
            location.replace(location.protocol + "//" + location.host);
        }
    }
}
