/// <reference path="../appreferences.ts" />
module App {
    export enum AntennaType {
        omni, dish
    }

    export class Antenna {
        'use strict';

        name: string;
        type: AntennaType;
        range: number;
        elcConsumption: number;

        constructor(name: string, type: AntennaType, range: number, elcConsumption: number) {
            this.name = name;
            this.type = type;
            this.range = range;
            this.elcConsumption = elcConsumption;
        }

        clone(): Antenna {
            return new Antenna(this.name, this.type, this.range, this.elcConsumption);
        }
    }
}
