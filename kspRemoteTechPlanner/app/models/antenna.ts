/// <reference path="../_references.ts" />

namespace App {
    'use strict';

    export class AntennaType {
        static omni: string = "omni";
        static dish: string = "dish";
    }

    export class Antenna {
        name: string;
        type: string;
        range: number;
        elcNeeded: number;

        constructor(name: string, type: string, range: number, elcNeeded: number) {
            this.name = name;
            this.type = type;
            this.range = range;
            this.elcNeeded = elcNeeded;
        }

        clone(): Antenna {
            return new Antenna(this.name, this.type, this.range, this.elcNeeded);
        }
    }

    export interface AntennaJSON {
        name: string;
        type: string;
        range: number;
        elcNeeded: number;
    }
}
