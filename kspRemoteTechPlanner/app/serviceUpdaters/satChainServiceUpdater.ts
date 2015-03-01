/// <reference path="../appreferences.ts" />

module App {
    export function satChainServiceUpdater(satChain: any, oldVersion: number): ISatChain {
        if (oldVersion === undefined) { // update to ver 1.5
            satChain.antennas = [new AntennaEquipment(satChain.antenna, 1)];
            satChain.antennaIndex = 0;
        }

        return satChain;
    }
}
