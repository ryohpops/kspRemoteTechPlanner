/// <reference path="../appreferences.ts" />

module App {
    export interface IAntennaDictionary {
        [index: string]: IAntenna;
    }

    export function antennaStorageServiceUpdater(userAntennas: any, oldVersion: number): IAntennaDictionary {
        if (oldVersion === undefined) { // update to ver 1.5
            for (var key in userAntennas) {
                if (userAntennas[key].type == 0)
                    userAntennas[key].type = "0";
                else if (userAntennas[key].type == 1)
                    userAntennas[key].type = "1";
            }
        }

        return userAntennas;
    }
}
