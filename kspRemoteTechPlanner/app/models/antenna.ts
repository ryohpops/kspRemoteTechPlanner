/// <reference path="../appreferences.ts" />

module App {
    export class AntennaType {
        static omni: string = "0";
        static dish: string = "1";
    }

    export interface Antenna {
        name: string;
        type: AntennaType;
        range: number;
        elcNeeded: number;
    }
}
