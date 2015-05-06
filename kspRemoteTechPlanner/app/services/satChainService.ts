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
                new SatChain(new Body("Kerbin", "rgb(63,111,40)", 600, 3531.6, 84159.286), 4, 1000, 0.029,
                    [{ antenna: new Antenna("Communotron 16", AntennaType.omni, 2500, 0.13), quantity: 1 }], 0, 70),
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
