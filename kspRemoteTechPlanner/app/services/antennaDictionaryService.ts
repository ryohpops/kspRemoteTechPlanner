/// <reference path="../_references.ts" />

module App {
    export interface AntennaDictionary {
        [index: string]: Antenna;
    }

    interface AntennaJSONDictionary {
        [index: string]: AntennaJSON;
    }

    export class AntennaDictionaryService {
        'use strict';

        private static dataKey: string = "userAntenna";
        private static versionKey: string = "userAntennaVersion";
        private static modelVersion: number = 1;

        private _stockAntennas: AntennaDictionary;
        get stockAntennas(): AntennaDictionary { return this._stockAntennas; }

        private _userAntennas: AntennaDictionary;
        get userAntennas(): AntennaDictionary { return this._userAntennas; }

        static $inject = ["storageServ"];
        constructor(
            private storageServ: StorageService
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
                "Reflectron GX-128": new Antenna("Reflectron GX-128", AntennaType.dish, 400000000, 2.8),
                "RSS Reflectron DP-10": new Antenna("RSS Reflectron DP-10", AntennaType.omni, 1000000000, 0.005),
                "RSS Communotron 16": new Antenna("RSS Communotron 16", AntennaType.omni, 4000000000, 0.002),
                "RSS CommTech EXP-VR-2T": new Antenna("RSS CommTech EXP-VR-2T", AntennaType.omni, 10000000000, 0.02),
                "RSS Communotron 32": new Antenna("RSS Communotron 32", AntennaType.omni, 8000000000, 0.004),
                "RSS Comms DTS-M1": new Antenna("RSS Comms DTS-M1", AntennaType.dish, 400000, 0.02),
                "RSS Reflectron KR-7": new Antenna("RSS Reflectron KR-7", AntennaType.dish, 200000000, 0.18),
                "RSS Communotron 88-88": new Antenna("RSS Communotron 88-88", AntennaType.dish, 1500000000, 0.35),
                "RSS Reflectron KR-14": new Antenna("RSS Reflectron KR-14", AntennaType.dish, 1000000000, 0.2),
                "RSS CommTech-1": new Antenna("RSS CommTech-1", AntennaType.dish, 4000000000, 0.2),
                "RSS Reflectron GX-128": new Antenna("RSS Reflectron GX-128", AntennaType.dish, 8000000000, 0.65)
            };

            var loaded: LoadResult = storageServ.load(AntennaDictionaryService.dataKey, AntennaDictionaryService.versionKey);
            if (loaded.data)
                this._userAntennas = this.unpack(this.update(loaded.data, loaded.version));
            else
                this._userAntennas = {};

            this.save();
            storageServ.setVersion(AntennaDictionaryService.versionKey, AntennaDictionaryService.modelVersion);
        }

        get(name: string): Antenna {
            if (Object.keys(this.stockAntennas).indexOf(name) !== -1)
                return this.stockAntennas[name].clone();
            else if (Object.keys(this.userAntennas).indexOf(name) !== -1)
                return this.userAntennas[name].clone();
            else
                return undefined;
        }

        set(name: string, antenna: Antenna) {
            this.userAntennas[name] = antenna.clone();
        }

        remove(name: string) {
            delete this.userAntennas[name];
        }

        save() {
            this.storageServ.save(AntennaDictionaryService.dataKey, this.pack(this.userAntennas));
        }

        private pack(antennaDict: AntennaDictionary): AntennaJSONDictionary {
            var ajd: AntennaJSONDictionary = {};

            for (var index in antennaDict) {
                var a: Antenna = antennaDict[index];
                ajd[index] = { name: a.name, type: a.type, range: a.range, elcNeeded: a.elcNeeded };
            }

            return ajd;
        }

        private unpack(json: AntennaJSONDictionary): AntennaDictionary {
            var ad: AntennaDictionary = {};

            for (var index in json) {
                var aj: AntennaJSON = json[index];
                ad[index] = new Antenna(aj.name, aj.type, aj.range, aj.elcNeeded);
            }

            return ad;
        }

        private update(userAntennas: any, oldVersion: number): AntennaDictionary {
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
