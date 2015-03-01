/// <reference path="../appreferences.ts" />

module App {
    export interface IAntenna {
        name: string;
        type: AntennaType;
        range: number;
        elcNeeded: number;
    }
}
