/// <reference path="../_references.ts" />

namespace App {
    'use strict';

    const lengthUnits: string[] = ["km", "Mm", "Gm", "Tm"];
    const lengthShrinkRate: number = 1000;
    const lengthUnitLimits: number = 10000;

    export function format(): Function {
        return (target: number, mode: string): string => {
            switch (mode) {
                case "length":
                    let shrink: number = 0;
                    while (target >= lengthUnitLimits && shrink < lengthUnits.length - 1) {
                        target /= lengthShrinkRate;
                        shrink++;
                    }
                    return `${target.toLocaleString() } ${lengthUnits[shrink]}`;

                case "time":
                    return `${parseFloat(target.toFixed(1)).toLocaleString() } sec.`;

                case "speed":
                    return `${parseFloat(target.toFixed(1)).toLocaleString() } m/s`;

                default:
                    return target.toLocaleString();
            }
        }
    }
}
