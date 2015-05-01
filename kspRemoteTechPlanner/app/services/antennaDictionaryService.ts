/// <reference path="../_references.ts" />

module App {
    export interface AntennaDictionary {
        [index: string]: Antenna;
    }

    export class AntennaDictionaryService extends DuplexDataService<AntennaDictionary>{
        'use strict';

        private static dataKey: string = "userAntenna";
        private static versionKey: string = "userAntennaVersion";
        private static modelVersion: number = 1;

        private _stockAntennas: AntennaDictionary;
        get stockAntennas(): AntennaDictionary { return this._stockAntennas; }

        private _userAntennas: AntennaDictionary;
        get userAntennas(): AntennaDictionary { return this._userAntennas; }

        static $inject = ["$cookieStore", "localStorageService"];
        constructor(
            $cookieStore: ng.cookies.ICookieStoreService,
            localStorage: ng.local.storage.ILocalStorageService<any>
            ) {

            super($cookieStore, localStorage,
                {
                    "Reflectron DP-10": { name: "Reflectron DP-10", type: AntennaType.omni, range: 500, elcNeeded: 0.01 },
                    "Communotron 16": { name: "Communotron 16", type: AntennaType.omni, range: 2500, elcNeeded: 0.13 },
                    "CommTech EXP-VR-2T": { name: "CommTech EXP-VR-2T", type: AntennaType.omni, range: 3000, elcNeeded: 0.18 },
                    "Communotron 32": { name: "Communotron 32", type: AntennaType.omni, range: 5000, elcNeeded: 0.6 },
                    "Comms DTS-M1": { name: "Comms DTS-M1", type: AntennaType.dish, range: 50000, elcNeeded: 0.82 },
                    "Reflectron KR-7": { name: "Reflectron KR-7", type: AntennaType.dish, range: 90000, elcNeeded: 0.82 },
                    "Communotron 88-88": { name: "Communotron 88-88", type: AntennaType.dish, range: 40000000, elcNeeded: 0.93 },
                    "Reflectron KR-14": { name: "Reflectron KR-14", type: AntennaType.dish, range: 60000000, elcNeeded: 0.93 },
                    "CommTech-1": { name: "CommTech-1", type: AntennaType.dish, range: 350000000, elcNeeded: 2.6 },
                    "Reflectron GX-128": { name: "Reflectron GX-128", type: AntennaType.dish, range: 400000000, elcNeeded: 2.8 },
                    "RSS Reflectron DP-10": { name: "RSS Reflectron DP-10", type: AntennaType.omni, range: 1000000000, elcNeeded: 0.005 },
                    "RSS Communotron 16": { name: "RSS Communotron 16", type: AntennaType.omni, range: 4000000000, elcNeeded: 0.002 },
                    "RSS CommTech EXP-VR-2T": { name: "RSS CommTech EXP-VR-2T", type: AntennaType.omni, range: 10000000000, elcNeeded: 0.02 },
                    "RSS Communotron 32": { name: "RSS Communotron 32", type: AntennaType.omni, range: 8000000000, elcNeeded: 0.004 },
                    "RSS Comms DTS-M1": { name: "RSS Comms DTS-M1", type: AntennaType.dish, range: 400000, elcNeeded: 0.02 },
                    "RSS Reflectron KR-7": { name: "RSS Reflectron KR-7", type: AntennaType.dish, range: 200000000, elcNeeded: 0.18 },
                    "RSS Communotron 88-88": { name: "RSS Communotron 88-88", type: AntennaType.dish, range: 1500000000, elcNeeded: 0.35 },
                    "RSS Reflectron KR-14": { name: "RSS Reflectron KR-14", type: AntennaType.dish, range: 1000000000, elcNeeded: 0.2 },
                    "RSS CommTech-1": { name: "RSS CommTech-1", type: AntennaType.dish, range: 4000000000, elcNeeded: 0.2 },
                    "RSS Reflectron GX-128": { name: "RSS Reflectron GX-128", type: AntennaType.dish, range: 8000000000, elcNeeded: 0.65 }

                }, {},
                AntennaDictionaryService.dataKey, AntennaDictionaryService.versionKey, AntennaDictionaryService.modelVersion, AntennaDictionaryService.updater);

            this._stockAntennas = this.static;
            this._userAntennas = this.dynamic;
        }

        private clone(antenna: Antenna): Antenna {
            return { name: antenna.name, type: antenna.type, range: antenna.range, elcNeeded: antenna.elcNeeded };
        }

        get(name: string): Antenna {
            if (Object.keys(this.stockAntennas).indexOf(name) !== -1)
                return this.clone(this.stockAntennas[name]);
            else if (Object.keys(this.userAntennas).indexOf(name) !== -1)
                return this.clone(this.userAntennas[name]);
            else
                return undefined;
        }

        set(name: string, antenna: Antenna) {
            this.userAntennas[name] = this.clone(antenna);
        }

        remove(name: string) {
            delete this.userAntennas[name];
        }

        private static updater(userAntennas: any, oldVersion: number): AntennaDictionary {
            if (oldVersion === undefined) { // update to ver 1.5
                for (var key in userAntennas) {
                    if (userAntennas[key].type == 0)
                        userAntennas[key].type = "0";
                    else if (userAntennas[key].type == 1)
                        userAntennas[key].type = "1";
                }
            }

            return userAntennas;
        }
    }
}
