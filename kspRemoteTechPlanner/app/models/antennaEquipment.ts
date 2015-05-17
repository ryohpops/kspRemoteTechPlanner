/// <reference path="../_references.ts" />

module App {
    export interface AntennaEquipment {
        antenna: Antenna;
        quantity: number;
    }

    export interface AntennaEquipmentJSON {
        antenna: string;
        quantity: number;
    }
}
