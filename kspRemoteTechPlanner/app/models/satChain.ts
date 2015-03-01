/// <reference path="../appreferences.ts" />

module App {
    export class SatChain implements ISatChain {
        'use strict';

        body: Body;
        count: number;
        altitude: number;
        elcNeeded: number;
        antennas: AntennaEquipment[];
        antennaIndex: number;
        parkingAlt: number;

        get selectedAntenna(): Antenna {
            return this.antennas[this.antennaIndex].antenna;
        }

        constructor(body: Body, count: number, altitude: number, elcNeeded: number, antennas: AntennaEquipment[], antennaIndex: number, parkingAlt: number) {
            this.body = body;
            this.count = count;
            this.altitude = altitude;
            this.elcNeeded = elcNeeded;
            this.antennas = antennas;
            this.antennaIndex = antennaIndex;
            this.parkingAlt = parkingAlt;
        }
    }
}
