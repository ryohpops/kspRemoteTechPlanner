/// <reference path="../references.ts" />

enum AntennaType {
    omni, dish
}

class Antenna {
    name: string;
    type: AntennaType;
    range: number;
    elcConsumption: number;
} 