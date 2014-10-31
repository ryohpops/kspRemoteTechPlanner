/// <reference path="../references.ts" />

class AntennaData extends CookieConnector {
    'use strict';

    private static cookieKey: string = "userAntenna";

    stockAntennas: { [index: string]: Antenna } = {
        "Reflectron DP-10": new Antenna("Reflectron DP-10", AntennaType.omni, 500, 0.01),
        "Communotron 16": new Antenna("Communotron 16", AntennaType.omni, 2500, 0.13),
        "CommTech EXP-VR-2T": new Antenna("CommTech EXP-VR-2T", AntennaType.omni, 3000, 0.18),
        "Communotron 32": new Antenna("Communotron 32", AntennaType.omni, 5000, 0.6),
        "Comms DTS-M1": new Antenna("Comms DTS-M1", AntennaType.dish, 50000, 0.82),
        "Reflectron KR-7": new Antenna("Reflectron KR-7", AntennaType.dish, 90000, 0.82)
    };
    userAntennas: { [index: string]: Antenna } = {};

    constructor() {
        super(AntennaData.cookieKey);
    }

    getAntenna(name: string): Antenna {
        var a: Antenna = this.stockAntennas[name];
        if (a == undefined)
            a = this.userAntennas[name];
        return a;
    }

    save() {
        this.saveCookie(this.userAntennas);
    }

    load(): boolean {
        this.userAntennas = this.loadCookie();
        if (this.userAntennas == undefined) {
            this.userAntennas = {};
            return false;
        } else {
            return true;
        }
    }
}