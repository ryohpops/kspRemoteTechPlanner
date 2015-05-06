/// <reference path="../_references.ts" />

module App {
    export interface BodyDictionary {
        [index: string]: Body;
    }

    export class BodyDictionaryService extends DuplexDataService<BodyDictionary>{
        'use strict';

        private static dataKey: string = "userBody";
        private static versionKey: string = "userBodyVersion";
        private static modelVersion: number = 1;

        private _stockBodies: BodyDictionary;
        get stockBodies(): BodyDictionary { return this._stockBodies; }

        private _userBodies: BodyDictionary;
        get userBodies(): BodyDictionary { return this._userBodies; }

        static $inject = ["$cookieStore", "localStorageService"];
        constructor(
            $cookieStore: ng.cookies.ICookieStoreService,
            localStorage: ng.local.storage.ILocalStorageService<any>
            ) {

            super($cookieStore, localStorage,
                {
                    "Kerbol": { name: "Kerbol", color: "rgb(255,242,0)", radius: 261600, stdGravity: 1172332800, soi: Number.POSITIVE_INFINITY },
                    "Moho": { name: "Moho", color: "rgb(185,122,87)", radius: 250, stdGravity: 168.60938, soi: 9646.663 },
                    "Eve": { name: "Eve", color: "rgb(163,73,164)", radius: 700, stdGravity: 8171.7302, soi: 85109.365 },
                    "Gilly": { name: "Gilly", color: "rgb(239,228,176)", radius: 13, stdGravity: 0.0082894498, soi: 126.12327 },
                    "Kerbin": { name: "Kerbin", color: "rgb(63,111,40)", radius: 600, stdGravity: 3531.6, soi: 84159.286 },
                    "Mun": { name: "Mun", color: "rgb(127,127,127)", radius: 200, stdGravity: 65.138398, soi: 2429.5591 },
                    "Minmus": { name: "Minmus", color: "rgb(153,217,234)", radius: 60, stdGravity: 1.7658, soi: 2247.4284 },
                    "Duna": { name: "Duna", color: "rgb(237,28,36)", radius: 320, stdGravity: 301.36321, soi: 47921.949 },
                    "Ike": { name: "Ike", color: "rgb(127,127,127)", radius: 130, stdGravity: 18.568369, soi: 1049.5989 },
                    "Dres": { name: "Dres", color: "rgb(195,195,195)", radius: 138, stdGravity: 21.484489, soi: 32832.84 },
                    "Jool": { name: "Jool", color: "rgb(92,231,58)", radius: 6000, stdGravity: 282528, soi: 2455985.2 },
                    "Laythe": { name: "Laythe", color: "rgb(25,55,98)", radius: 500, stdGravity: 1962, soi: 3723.6458 },
                    "Vall": { name: "Vall", color: "rgb(82,133,141)", radius: 300, stdGravity: 207.48150, soi: 2406.4014 },
                    "Tylo": { name: "Tylo", color: "rgb(195,195,195)", radius: 600, stdGravity: 4523.8934, soi: 10856.518 },
                    "Bop": { name: "Bop", color: "rgb(142,106,51)", radius: 65, stdGravity: 2.4868349, soi: 1221.0609 },
                    "Pol": { name: "Pol", color: "rgb(206,211,1)", radius: 44, stdGravity: 0.72170208, soi: 1042.1389 },
                    "Eeloo": { name: "Eeloo", color: "rgb(221,221,210)", radius: 210, stdGravity: 74.410815, soi: 119082.94 },
                    "Mercury": { name: "Mercury", color: "rgb(185,122,87)", radius: 2439, stdGravity: 22026, soi: 112410 },
                    "Venus": { name: "Venus", color: "rgb(163,73,164)", radius: 6051, stdGravity: 324670, soi: 616210 },
                    "Earth": { name: "Earth", color: "rgb(63,111,40)", radius: 6371, stdGravity: 398600, soi: 923895 },
                    "Moon": { name: "Moon", color: "rgb(127,127,127)", radius: 1737, stdGravity: 4900, soi: 66167 },
                    "Mars": { name: "Mars", color: "rgb(237,28,36)", radius: 3380, stdGravity: 42811, soi: 577231 },
                    "Phobos": { name: "Phobos", color: "rgb(142,106,51)", radius: 7, stdGravity: 0.000715, soi: 27 },
                    "Deimos": { name: "Deimos", color: "rgb(239,228,176)", radius: 5.456, stdGravity: 0.000098716, soi: 25 },
                    "Jupiter": { name: "Jupiter", color: "rgb(92,231,58)", radius: 69911, stdGravity: 127000000, soi: 48190353 },
                    "Io": { name: "Io", color: "rgb(206,211,1)", radius: 1811, stdGravity: 5957.6, soi: 7841 },
                    "Europa": { name: "Europa", color: "rgb(221,221,210)", radius: 1550, stdGravity: 3201.5, soi: 9728 },
                    "Ganymede": { name: "Ganymede", color: "rgb(195,195,195)", radius: 2624, stdGravity: 9884.3, soi: 10856.518 },
                    "Callisto": { name: "Callisto", color: "rgb(127,127,127)", radius: 2409, stdGravity: 7176.5, soi: 37706 },
                    "Saturn": { name: "Saturn", color: "rgb(195,195,195)", radius: 60268, stdGravity: 37900000, soi: 54468720 },
                    "Titan": { name: "Titan", color: "rgb(25,55,98)", radius: 2566, stdGravity: 8972.5, soi: 43324 },
                    "Uranus": { name: "Uranus", color: "rgb(153,217,234)", radius: 25559, stdGravity: 5790000, soi: 51686225 },
                    "Pluto": { name: "Pluto", color: "rgb(82,133,141)", radius: 1143, stdGravity: 870.44, soi: 3116132 }
                }, {},
                BodyDictionaryService.dataKey, BodyDictionaryService.versionKey, BodyDictionaryService.modelVersion, BodyDictionaryService.updater);

            this._stockBodies = this.static;
            this._userBodies = this.dynamic;
        }

        get(name: string): Body {
            if (Object.keys(this.stockBodies).indexOf(name) !== -1)
                return this.stockBodies[name].clone();
            else if (Object.keys(this.userBodies).indexOf(name) !== -1)
                return this.userBodies[name].clone();
            else
                return undefined;
        }

        set(name: string, body: Body) {
            this.userBodies[name] = body.clone();
        }

        remove(name: string) {
            delete this.userBodies[name];
        }

        private static updater(userBodies: any, oldVersion: number): BodyDictionary {
            return userBodies;
        }
    }
}
