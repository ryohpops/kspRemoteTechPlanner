/// <reference path="../_references.ts" />

namespace App {
    'use strict';

    export type AntennaDictionary = { [index: string]: Antenna };
    type AntennaJSONDictionary = { [index: string]: AntennaJSON };

    export class AntennaDictionaryService {
        private static dataKey: string = "userAntenna";
        private static versionKey: string = "userAntennaVersion";
        private static modelVersion: number = 2;

        private _stockAntennas: AntennaDictionary;
        get stockAntennas(): AntennaDictionary { return this._stockAntennas; }

        private _userAntennas: AntennaDictionary;
        get userAntennas(): AntennaDictionary { return this._userAntennas; }

        static $inject = ["storageServ", "settingsServ"];
        constructor(
            private storageServ: StorageService,
            private settingsServ: SettingsService
            ) {

            this._stockAntennas = {
                "Reflectron DP-10": new Antenna("Reflectron DP-10", AntennaType.omni, 500, 0.01),
                "Communotron 16-S": new Antenna("Communotron 16-S", AntennaType.omni, 1500, 0.02),
                "Communotron 16": new Antenna("Communotron 16", AntennaType.omni, 2500, 0.13),
                "CommTech EXP-VR-2T": new Antenna("CommTech EXP-VR-2T", AntennaType.omni, 3000, 0.18),
                "Communotron 32": new Antenna("Communotron 32", AntennaType.omni, 5000, 0.6),
                "HG-5 High Gain Antenna": new Antenna("HG-5 High Gain Antenna", AntennaType.dish, 20000, 0.55),
                "Comms DTS-M1": new Antenna("Comms DTS-M1", AntennaType.dish, 50000, 0.82),
                "Reflectron KR-7": new Antenna("Reflectron KR-7", AntennaType.dish, 90000, 0.82),
                "RA-2 Relay Antenna": new Antenna("RA-2 Relay Antenna", AntennaType.dish, 200000, 1.15),
                "RA-15 Relay Antenna": new Antenna("RA-15 Relay Antenna", AntennaType.dish, 10000000, 1.10),
                "Communotron HG-55": new Antenna("Communotron HG-55", AntennaType.dish, 25000000, 1.04),
                "Communotron 88-88": new Antenna("Communotron 88-88", AntennaType.dish, 40000000, 0.93),
                "Reflectron KR-14": new Antenna("Reflectron KR-14", AntennaType.dish, 60000000, 0.93),
                "RA-100 Relay Antenna": new Antenna("RA-100 Relay Antenna", AntennaType.dish, 100000000, 1.10),
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

            let loaded: LoadResult = storageServ.load(AntennaDictionaryService.dataKey, AntennaDictionaryService.versionKey);
            if (loaded.data)
                this._userAntennas = this.unpack(this.update(loaded.data, loaded.version));
            else
                this._userAntennas = {};

            this.save();
            storageServ.setVersion(AntennaDictionaryService.versionKey, AntennaDictionaryService.modelVersion);
        }

        get(name: string): Antenna {
            let ret: Antenna;
            if (name in this.stockAntennas)
                ret = this.stockAntennas[name].clone();
            else if (name in this.userAntennas)
                ret = this.userAntennas[name].clone();

            if (ret)
                ret.range *= this.settingsServ.settings.rangeMultiplier;
            return ret;
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
            let ajd: AntennaJSONDictionary = {};

            for (let index in antennaDict) {
                let a: Antenna = antennaDict[index];
                ajd[index] = { name: a.name, type: a.type, range: a.range, elcNeeded: a.elcNeeded };
            }

            return ajd;
        }

        private unpack(json: AntennaJSONDictionary): AntennaDictionary {
            let ad: AntennaDictionary = {};

            for (let index in json) {
                let aj: AntennaJSON = json[index];
                ad[index] = new Antenna(aj.name, aj.type, aj.range, aj.elcNeeded);
            }

            return ad;
        }

        private update(userAntennas: any, oldVersion: number): AntennaDictionary {
            if (oldVersion === undefined) { // update to ver 1.5
                for (let key in userAntennas) {
                    if (userAntennas[key].type == 0)
                        userAntennas[key].type = "0";
                    else if (userAntennas[key].type == 1)
                        userAntennas[key].type = "1";
                }
                oldVersion = 1;
            }

            if (oldVersion === 1) {
                for (let key in userAntennas) {
                    if (userAntennas[key].type === "0")
                        userAntennas[key].type = AntennaType.omni;
                    else if (userAntennas[key].type === "1")
                        userAntennas[key].type = AntennaType.dish;
                }
                oldVersion = 2;
            }

            return userAntennas;
        }
    }
}
