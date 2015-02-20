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

        static $inject = ["$cookieStore"];
        constructor(
            private $cookieStore: ng.cookies.ICookieStoreService
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
            this.$cookieStore.put(AntennaStorageService.versionKey, AntennaStorageService.modelVersion);
        }

        private loadUserAntennas(): AntennaDictionary {
            var ua: any = this.$cookieStore.get(AntennaStorageService.dataKey); // JSON object, functions are not ready
            var version: number = this.$cookieStore.get(AntennaStorageService.versionKey);

            if (ua !== undefined) {
                if (version === undefined) { // update to ver 1.5
                    for (var key in ua) {
                        if (ua[key].type == 0)
                            ua[key].type = "0";
                        else if (ua[key].type == 1)
                            ua[key].type = "1";
                    }
                }

                var retDict: AntennaDictionary = {};
                for (var key in ua) {
                    var a: Antenna = ua[key];
                    retDict[a.name] = new Antenna(a.name, a.type, a.range, a.elcNeeded);
                }
                return retDict;
            } else {
                return {};
            }
        }

        save() {
            if (Object.keys(this.userAntennas).length > 0)
                this.$cookieStore.put(AntennaStorageService.dataKey, this.userAntennas);
            else
                this.$cookieStore.remove(AntennaStorageService.dataKey);
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
