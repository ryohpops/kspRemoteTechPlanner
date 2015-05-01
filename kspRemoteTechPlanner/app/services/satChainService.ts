/// <reference path="../_references.ts" />

module App {
    export class SatChainService extends DataService<SatChain> {
        'use strict';

        private static dataKey: string = "inputData";
        private static versionKey: string = "inputDataVersion";
        private static modelVersion: number = 1;

        private _satChain: SatChain;
        get satChain(): SatChain { return this._satChain; }

        static $inject = ["$cookieStore", "localStorageService"];
        constructor(
            $cookieStore: ng.cookies.ICookieStoreService,
            localStorage: ng.local.storage.ILocalStorageService<any>
            ) {

            super($cookieStore, localStorage,
                {
                    body: { name: "Kerbin", color: "rgb(63,111,40)", radius: 600, stdGravity: 3531.6, soi: 84159.286 },
                    count: 4, altitude: 1000, elcNeeded: 0.029,
                    antennas: [{ antenna: { name: "Communotron 16", type: AntennaType.omni, range: 2500, elcNeeded: 0.13 }, quantity: 1 }],
                    antennaIndex: 0, parkingAlt: 70
                },
                SatChainService.dataKey, SatChainService.versionKey, SatChainService.modelVersion, SatChainService.updater);
            this._satChain = this.data;
        }

        get selectedAntenna(): Antenna {
            return this.satChain.antennas[this.satChain.antennaIndex].antenna;
        }

        private static updater(satChain: any, oldVersion: number): SatChain {
            if (oldVersion === undefined) { // update to ver 1.5
                satChain.antennas = [{ antenna: satChain.antenna, quantity: 1 }];
                satChain.antennaIndex = 0;
            }

            return satChain;
        }
    }
}
