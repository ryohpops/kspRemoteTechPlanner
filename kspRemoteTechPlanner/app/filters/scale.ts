/// <reference path="../_references.ts" />

module App {
    'use strict';

    export function scale(): Function {
        return (virtual: number, realSize: number, virtualSize: number): number => {
            return virtual * realSize / virtualSize;
        }
    }
}
