/// <reference path="../_references.ts" />

module App {
    export class SatChain {
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

        constructor(body: Body, count: number, altitude: number, elcNeeded: number, antennas: AntennaEquipment[], antennaIndex: number, parkingAlt: number);
        constructor(storedData: any);
        constructor(data: any, count?: number, altitude?: number, elcNeeded?: number, antennas?: AntennaEquipment[], antennaIndex?: number, parkingAlt?: number) {
            if (count) {
                this.body = data;
                this.count = count;
                this.altitude = altitude;
                this.elcNeeded = elcNeeded;
                this.antennas = antennas;
                this.antennaIndex = antennaIndex;
                this.parkingAlt = parkingAlt;
            } else {
                this.body = data.body;
                this.count = data.count;
                this.altitude = data.altitude;
                this.elcNeeded = data.elcNeeded;
                this.antennas = data.antennas;
                this.antennaIndex = data.antennaIndex;
                this.parkingAlt = data.parkingAlt;
            }
        }
    }

    export interface SatChainJSON {
        body: string;
        count: number;
        altitude: number;
        elcNeeded: number;
        antennas: AntennaEquipmentJSON[];
        antennaIndex: number;
        parkingAlt: number;
    }
}
