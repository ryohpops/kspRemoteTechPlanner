/// <reference path="../appreferences.ts" />

module App {
    export interface AntennaDictionary {
        [index: string]: Antenna;
    }

    export class AntennaStorageService {
        'use strict';

        private static dataKey: string = "userAntenna";
        private static versionKey: string = "userAntennaVersion";
        private static modelVersion: number = 1;

        private _stockAntennas: AntennaDictionary;
        private _userAntennas: AntennaDictionary;

        get stockAntennas(): AntennaDictionary {
            return this._stockAntennas;
        }

        get userAntennas(): AntennaDictionary {
            return this._userAntennas;
        }

        static $inject = ["$cookieStore", "localStorageService"];
        constructor(
            private $cookieStore: ng.cookies.ICookieStoreService,
            private localStorage: ng.local.storage.ILocalStorageService<any>
            ) {

            this._stockAntennas = {
                "Reflectron DP-10": new Antenna("Reflectron DP-10", AntennaType.omni, 500, 0.01),
                "Communotron 16": new Antenna("Communotron 16", AntennaType.omni, 2500, 0.13),
                "CommTech EXP-VR-2T": new Antenna("CommTech EXP-VR-2T", AntennaType.omni, 3000, 0.18),
                "Communotron 32": new Antenna("Communotron 32", AntennaType.omni, 5000, 0.6),
                "Comms DTS-M1": new Antenna("Comms DTS-M1", AntennaType.dish, 50000, 0.82),
                "Reflectron KR-7": new Antenna("Reflectron KR-7", AntennaType.dish, 90000, 0.82),
                "Communotron 88-88": new Antenna("Communotron 88-88", AntennaType.dish, 40000000, 0.93),
                "Reflectron KR-14": new Antenna("Reflectron KR-14", AntennaType.dish, 60000000, 0.93),
                "CommTech-1": new Antenna("CommTech-1", AntennaType.dish, 350000000, 2.6),
                "Reflectron GX-128": new Antenna("Reflectron GX-128", AntennaType.dish, 400000000, 2.8)
            };

            this._userAntennas = this.loadUserAntennas();
            this.localStorage.set(AntennaStorageService.versionKey, AntennaStorageService.modelVersion);
        }

        private loadUserAntennas(): AntennaDictionary {
            var data: any = this.localStorage.get(AntennaStorageService.dataKey); // JSON object, potential of old-version model
            if (!data) {
                data = this.$cookieStore.get(AntennaStorageService.dataKey); // deprecated, will be deleted in the near future.
                this.$cookieStore.remove(AntennaStorageService.dataKey);
            }
            var version: number = this.localStorage.get(AntennaStorageService.versionKey);

            if (data !== undefined) {
                var uaStored: IAntennaDictionary = antennaStorageServiceUpdater(data, version);

                var retDict: AntennaDictionary = {};
                for (var key in uaStored) {
                    var aStored: IAntenna = data[key];
                    retDict[aStored.name] = new Antenna(aStored.name, aStored.type, aStored.range, aStored.elcNeeded);
                }
                return retDict;
            } else {
                return {};
            }
        }

        save() {
            if (Object.keys(this.userAntennas).length > 0)
                this.localStorage.set(AntennaStorageService.dataKey, this.userAntennas);
            else
                this.localStorage.remove(AntennaStorageService.dataKey);
        }

        existsInStock(name: string): boolean {
            return Object.keys(this.stockAntennas).indexOf(name) !== -1;
        }

        existsInUser(name: string): boolean {
            return Object.keys(this.userAntennas).indexOf(name) !== -1;
        }

        getAntenna(name: string): Antenna {
            if (this.existsInStock(name))
                return this.stockAntennas[name].clone();
            else if (this.existsInUser(name))
                return this.userAntennas[name].clone();
            else
                return undefined;
        }

        setAntenna(name: string, data: Antenna) {
            this.userAntennas[name] = data.clone();
        }

        removeAntenna(name: string) {
            delete this.userAntennas[name];
        }
    }
}
