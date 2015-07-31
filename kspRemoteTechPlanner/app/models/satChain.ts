/// <reference path="../_references.ts" />

namespace App {
    'use strict';

    export class SatChain {
        mamIndex: number = -1;

        body: Body;
        count: number;
        altitude: number;
        elcNeeded: number;
        antennas: AntennaEquipment[];
        antennaIndex: number;
        parkingAlt: number;

        private _mam: Antenna;
        get mam(): Antenna {
            return this._mam;
        }

        get selectedAntenna(): Antenna {
            if (this.antennaIndex === this.mamIndex)
                return this.mam;
            else
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

            this._mam = new Antenna("Multiple Antenna Multiplier", AntennaType.omni, 0, 0);
        }

        longestRangeOmni(): Antenna {
            let ret: Antenna = new Antenna("error", AntennaType.omni, 0, 0);
            for (let ae of this.antennas) {
                let a: Antenna = ae.antenna;
                if (a.range > ret.range)
                    ret = a.clone();
            }
            return ret;
        }

        updateMam(multipleAntennaMultiplier: number) {
            this.mam.range = this.longestRangeOmni().range;

            let totalOmniRange: number = 0;
            let totalOmniElcNeeded: number = 0;
            for (let ae of this.antennas) {
                totalOmniRange += ae.antenna.range * ae.quantity;
                totalOmniElcNeeded += ae.antenna.elcNeeded + ae.quantity;
            }
            this.mam.range += (totalOmniRange - this.longestRangeOmni().range) * multipleAntennaMultiplier;
            this.mam.elcNeeded = totalOmniElcNeeded;
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
