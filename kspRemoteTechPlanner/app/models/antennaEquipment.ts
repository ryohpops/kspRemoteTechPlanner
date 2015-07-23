/// <reference path="../_references.ts" />

namespace App {
    'use strict';

    export interface AntennaEquipment {
        antenna: Antenna;
        quantity: number;
    }

    export interface AntennaEquipmentJSON {
        antenna: string;
        quantity: number;
    }
}
