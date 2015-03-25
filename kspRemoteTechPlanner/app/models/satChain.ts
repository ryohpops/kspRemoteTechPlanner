/// <reference path="../appreferences.ts" />

module App {
    export interface SatChain {
        body: Body;
        count: number;
        altitude: number;
        elcNeeded: number;
        antennas: AntennaEquipment[];
        antennaIndex: number;
        parkingAlt: number;
    }
}
