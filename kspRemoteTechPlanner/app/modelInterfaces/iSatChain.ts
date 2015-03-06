/// <reference path="../appreferences.ts" />

module App {
    export interface ISatChain {
        body: Body;
        count: number;
        altitude: number;
        elcNeeded: number;
        antennas: IAntennaEquipment[];
        antennaIndex: number;
        parkingAlt: number;
    }
}
