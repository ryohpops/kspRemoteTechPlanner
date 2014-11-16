/// <reference path="../appreferences.ts" />
module App {
    export enum AntennaType {
        omni = 0,
        dish = 1
    }

    export class Antenna {
        'use strict';

        name: string;
        type: AntennaType;
        range: number;
        elcNeeded: number;

        constructor(name: string, type: AntennaType, range: number, elcNeeded: number) {
            this.name = name;
            this.type = type;
            this.range = range;
            this.elcNeeded = elcNeeded;
        }

        clone(): Antenna {
            return new Antenna(this.name, this.type, this.range, this.elcNeeded);
        }
    }
}
