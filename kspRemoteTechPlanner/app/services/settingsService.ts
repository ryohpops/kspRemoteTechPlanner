/// <reference path="../_references.ts" />

module App {
    'use strict';

    export class SettingsService {
        private static dataKey: string = "settings";
        private static versionKey: string = "settingsVersion";
        private static modelVersion: number = 2;

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
                this._settings = new Settings(StockData.stock, 1, RangeModelType.standard, 0);
            }

            this.save();
            storageServ.setVersion(SettingsService.versionKey, SettingsService.modelVersion);
        }

        save() {
            this.storageServ.save(SettingsService.dataKey, this.pack(this.settings));
        }

        private pack(settings: Settings): SettingsJSON {
            var json: SettingsJSON = {
                stockData: settings.stockData,
                rangeMultiplier: settings.rangeMultiplier,
                rangeModelType: settings.rangeModelType,
                multipleAntennaMultiplier: settings.multipleAntennaMultiplier
            };

            return json;
        }

        private unpack(json: SettingsJSON): Settings {
            return new Settings(json.stockData, json.rangeMultiplier, json.rangeModelType, json.multipleAntennaMultiplier);
        }

        private update(settingsJson: any, oldVersion: number): SettingsJSON {
            if (oldVersion === 1) {
                settingsJson.rangeMultiplier = 1;
                settingsJson.rangeModelType = RangeModelType.standard;
                settingsJson.multipleAntennaMultiplier = 0;

                oldVersion = 2;
            }

            return settingsJson;
        }
    }
}
