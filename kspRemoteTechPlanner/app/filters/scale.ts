/// <reference path="../_references.ts" />

module App {
    export function scale(): Function {
        return (virtual: number, realSize: number, virtualSize: number): number => {
            return virtual * realSize / virtualSize;
        }
    }
}
