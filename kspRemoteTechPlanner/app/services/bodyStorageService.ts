/// <reference path="../appreferences.ts" />

module App {
    export interface BodyDictionary {
        [index: string]: Body;
    }

    export class BodyStorageService {
        'use strict';

        private _stockBodies: BodyDictionary;
        private _userBodies: BodyDictionary;

        get stockBodies(): BodyDictionary {
            return this._stockBodies;
        }

        get userBodies(): BodyDictionary {
            return this._userBodies;
        }

        static $inject = ["$cookieStore", "bodyStorageCookieKey"];
        constructor(
            private $cookieStore: ng.cookies.ICookieStoreService,
            private cookieKey: string
            ) {

            this._stockBodies = {
                "Kerbol": new Body("Kerbol", "rgb(255,242,0)", 261600, 1172332800, Number.POSITIVE_INFINITY),
                "Moho": new Body("Moho", "rgb(185,122,87)", 250, 168.60938, 9646.663),
                "Eve": new Body("Eve", "rgb(163,73,164)", 700, 8171.7302, 85109.365),
                "Gilly": new Body("Gilly", "rgb(239,228,176)", 13, 0.0082894498, 126.12327),
                "Kerbin": new Body("Kerbin", "rgb(63,111,40)", 600, 3531.6, 84159.286),
                "Mun": new Body("Mun", "rgb(127,127,127)", 200, 65.138398, 2429.5591),
                "Minmus": new Body("Minmus", "rgb(153,217,234)", 60, 1.7658, 2247.4284),
                "Duna": new Body("Duna", "rgb(237,28,36)", 320, 301.36321, 47921.949),
                "Ike": new Body("Ike", "rgb(127,127,127)", 130, 18.568369, 1049.5989),
                "Dres": new Body("Dres", "rgb(195,195,195)", 138, 21.484489, 32832.84),
                "Jool": new Body("Jool", "rgb(92,231,58)", 6000, 282528, 2455985.2),
                "Laythe": new Body("Laythe", "rgb(25,55,98)", 500, 1962, 3723.6458),
                "Vall": new Body("Vall", "rgb(82,133,141)", 300, 207.48150, 2406.4014),
                "Tylo": new Body("Tylo", "rgb(195,195,195)", 600, 4523.8934, 10856.518),
                "Bop": new Body("Bop", "rgb(142,106,51)", 65, 2.4868349, 1221.0609),
                "Pol": new Body("Pol", "rgb(206,211,1)", 44, 0.72170208, 1042.1389),
                "Eeloo": new Body("Eeloo", "rgb(221,221,210)", 210, 74.410815, 119082.94)
            };

            this.loadUserBodies();
        }

        private loadUserBodies() {
            this._userBodies = {};

            var ub: any = this.$cookieStore.get(this.cookieKey); // JSON object, functions are not ready
            if (ub !== undefined) {
                for (var key in ub) {
                    var b: Body = ub[key];
                    this._userBodies[b.name] = new Body(b.name, b.color, b.radius, b.stdGravity, b.soi);
                }
            }
        }

        save() {
            if (Object.keys(this.userBodies).length > 0)
                this.$cookieStore.put(this.cookieKey, this.userBodies);
            else
                this.$cookieStore.remove(this.cookieKey);
        }

        existsInStock(name: string): boolean {
            return Object.keys(this.stockBodies).indexOf(name) !== -1;
        }

        existsInUser(name: string): boolean {
            return Object.keys(this.userBodies).indexOf(name) !== -1;
        }

        getBody(name: string): Body {
            if (this.existsInStock(name))
                return this.stockBodies[name].clone();
            else if (this.existsInUser(name))
                return this.userBodies[name].clone();
            else
                return undefined;
        }

        setBody(name: string, data: Body) {
            this.userBodies[name] = data.clone();
        }

        removeBody(name: string) {
            delete this.userBodies[name];
        }
    }
}
