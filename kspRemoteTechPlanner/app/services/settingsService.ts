/// <reference path="../_references.ts" />

module App {
    'use strict';

    export class SettingsService {
        private static dataKey: string = "settings";
        private static versionKey: string = "settingsVersion";
        private static modelVersion: number = 1;

        private _settings: Settings;
        get settings(): Settings { return this._settings; }

        static $inject = ["storageServ"];
        constructor(
            private storageServ: StorageService
            ) {

            var loaded: LoadResult = storageServ.load(SettingsService.dataKey, SettingsService.versionKey);
            if (loaded.data) {
                this._settings = this.unpack(this.update(loaded.data, loaded.version));
            } else {
                this._settings = new Settings(StockData.stock);
            }

            this.save();
            storageServ.setVersion(SettingsService.versionKey, SettingsService.modelVersion);
        }

        save() {
            this.storageServ.save(SettingsService.dataKey, this.pack(this.settings));
        }

        private pack(settings: Settings): SettingsJSON {
            var json: SettingsJSON = {
                stockData: settings.stockData
            };

            return json;
        }

        private unpack(json: SettingsJSON): Settings {
            return new Settings(json.stockData);
        }

        private update(settingsJson: any, oldVersion: number): SettingsJSON {
            return <SettingsJSON>settingsJson;
        }
    }
}
