/// <reference path="../appreferences.ts" />
module App {
    export interface AntennaDictionary {
        [index: string]: Antenna;
    }

    export class AntennaStorageService {
        'use strict';

        private _stockAntennas: AntennaDictionary;
        private _userAntennas: AntennaDictionary;

        get stockAntennas(): AntennaDictionary {
            return this._stockAntennas;
        }

        get userAntennas(): AntennaDictionary {
            return this._userAntennas;
        }

        static $inject = ["$cookieStore", "antennaStorageCookieKey"];
        constructor(
            private $cookieStore: ng.cookies.ICookieStoreService,
            private cookieKey: string
            ) {

            this._stockAntennas = {
                "Reflectron DP-10": new Antenna("Reflectron DP-10", AntennaType.omni, 500, 0.01),
                "Communotron 16": new Antenna("Communotron 16", AntennaType.omni, 2500, 0.13),
                "CommTech EXP-VR-2T": new Antenna("CommTech EXP-VR-2T", AntennaType.omni, 3000, 0.18),
                "Communotron 32": new Antenna("Communotron 32", AntennaType.omni, 5000, 0.6),
                "Comms DTS-M1": new Antenna("Comms DTS-M1", AntennaType.dish, 50000, 0.82),
                "Reflectron KR-7": new Antenna("Reflectron KR-7", AntennaType.dish, 90000, 0.82)
            };

            this._userAntennas = this.loadOrCreate();
        }

        private loadOrCreate(): AntennaDictionary {
            var ua: AntennaDictionary = this.$cookieStore.get(this.cookieKey);
            if (ua !== undefined)
                return ua;
            else
                return {};
        }

        save() {
            if (Object.keys(this.userAntennas).length > 0)
                this.$cookieStore.put(this.cookieKey, this.userAntennas);
            else
                this.$cookieStore.remove(this.cookieKey);
        }
    }
}
