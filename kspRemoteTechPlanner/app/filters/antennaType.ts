/// <reference path="../appreferences.ts" />

module App {
    export function antennaType() {
        return (input: number) => {
            if (input === 0)
                return "Omnidirectional";
            else if (input === 1)
                return "Dish";
        }
    }
}
