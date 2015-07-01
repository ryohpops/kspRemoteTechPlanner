/// <reference path="../_references.ts" />

module App {
    'use strict';

    export function antennaType(): Function {
        return (input: string): string => {
            if (input === AntennaType.omni)
                return "Omnidirectional";
            else if (input === AntennaType.dish)
                return "Dish";
        }
    }
}
