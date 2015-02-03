/// <reference path="../appreferences.ts" />

module App {
    export class SatChain {
        'use strict';

        body: Body;
        count: number;
        altitude: number;
        elcNeeded: number;
        antenna: Antenna;
        parkingAlt: number;

        constructor(body: Body, count: number, altitude: number, elcNeeded: number, antenna: Antenna, parkingAlt: number) {
            this.body = body;
            this.count = count;
            this.altitude = altitude;
            this.elcNeeded = elcNeeded;
            this.antenna = antenna;
            this.parkingAlt = parkingAlt;
        }
    }
}
