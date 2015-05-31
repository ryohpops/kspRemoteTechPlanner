/// <reference path="../_references.ts" />

module App {
    'use strict';

    export class SettingsController {
        settings: Settings;

        $inject = ["settingsServ", "storageServ"];
        constructor(
            private settingsServ: SettingsService,
            private storageServ: StorageService
            ) {

            this.settings = this.settingsServ.settings;
        }

        onResetConfirm() {
            this.storageServ.reset();
            location.reload();
        }
    }
}
