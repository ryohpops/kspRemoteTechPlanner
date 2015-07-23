/// <reference path="../_references.ts" />

namespace App {
    'use strict';

    export type BodyDictionary = { [index: string]: Body };
    type BodyJSONDictionary = { [index: string]: BodyJSON };

    export class BodyDictionaryService {
        private static dataKey: string = "userBody";
        private static versionKey: string = "userBodyVersion";
        private static modelVersion: number = 1;

        private _stockBodies: BodyDictionary;
        get stockBodies(): BodyDictionary { return this._stockBodies; }

        private _userBodies: BodyDictionary;
        get userBodies(): BodyDictionary { return this._userBodies; }

        static $inject = ["storageServ"];
        constructor(
            private storageServ: StorageService
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
                "Eeloo": new Body("Eeloo", "rgb(221,221,210)", 210, 74.410815, 119082.94),
                "Mercury": new Body("Mercury", "rgb(185,122,87)", 2439, 22026, 112410),
                "Venus": new Body("Venus", "rgb(163,73,164)", 6051, 324670, 616210),
                "Earth": new Body("Earth", "rgb(63,111,40)", 6371, 398600, 923895),
                "Moon": new Body("Moon", "rgb(127,127,127)", 1737, 4900, 66167),
                "Mars": new Body("Mars", "rgb(237,28,36)", 3380, 42811, 577231),
                "Phobos": new Body("Phobos", "rgb(142,106,51)", 7, 0.000715, 27),
                "Deimos": new Body("Deimos", "rgb(239,228,176)", 5.456, 0.000098716, 25),
                "Jupiter": new Body("Jupiter", "rgb(92,231,58)", 69911, 127000000, 48190353),
                "Io": new Body("Io", "rgb(206,211,1)", 1811, 5957.6, 7841),
                "Europa": new Body("Europa", "rgb(221,221,210)", 1550, 3201.5, 9728),
                "Ganymede": new Body("Ganymede", "rgb(195,195,195)", 2624, 9884.3, 10856.518),
                "Callisto": new Body("Callisto", "rgb(127,127,127)", 2409, 7176.5, 37706),
                "Saturn": new Body("Saturn", "rgb(195,195,195)", 60268, 37900000, 54468720),
                "Titan": new Body("Titan", "rgb(25,55,98)", 2566, 8972.5, 43324),
                "Uranus": new Body("Uranus", "rgb(153,217,234)", 25559, 5790000, 51686225),
                "Pluto": new Body("Pluto", "rgb(82,133,141)", 1143, 870.44, 3116132)
            };

            let loaded: LoadResult = storageServ.load(BodyDictionaryService.dataKey, BodyDictionaryService.versionKey);
            if (loaded.data)
                this._userBodies = this.unpack(this.update(loaded.data, loaded.version));
            else
                this._userBodies = {};

            this.save();
            storageServ.setVersion(BodyDictionaryService.versionKey, BodyDictionaryService.modelVersion);
        }

        get(name: string): Body {
            if (name in this.stockBodies)
                return this.stockBodies[name].clone();
            else if (name in this.userBodies)
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

        save() {
            this.storageServ.save(BodyDictionaryService.dataKey, this.pack(this.userBodies));
        }

        private pack(bodyDict: BodyDictionary): BodyJSONDictionary {
            let bjd: BodyJSONDictionary = {};

            for (let index in bodyDict) {
                let b: Body = bodyDict[index];
                bjd[index] = { name: b.name, color: b.color, radius: b.radius, stdGravity: b.stdGravity, soi: b.soi };
            }

            return bjd;
        }

        private unpack(json: BodyJSONDictionary): BodyDictionary {
            let bd: BodyDictionary = {};

            for (let index in json) {
                let bj: BodyJSON = json[index];
                bd[index] = new Body(bj.name, bj.color, bj.radius, bj.stdGravity, bj.soi);
            }

            return bd;
        }

        private update(ubJson: any, oldVersion: number): BodyDictionary {
            return ubJson;
        }
    }
}
