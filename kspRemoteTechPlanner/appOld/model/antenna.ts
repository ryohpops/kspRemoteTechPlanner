/// <reference path="../references.ts" />

enum AntennaType {
    omni, dish
}

class Antenna {
    'use strict';

    name: string;
    type: AntennaType;
    range: number;
    elcConsumption: number;

    constructor(name: string, type: AntennaType, range: number, elcConsumption: number) {
        this.name = name;
        this.type = type;
        this.range = range;
        this.elcConsumption = elcConsumption;
    }
} 