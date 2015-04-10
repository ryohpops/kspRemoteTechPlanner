/// <reference path="../appreferences.ts" />

module App {
    export function scale() {
        return (virtual: number, realSize: number, virtualSize: number) => {
            return virtual * realSize / virtualSize;
        }
    }
}
