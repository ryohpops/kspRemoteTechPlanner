/// <reference path="../_references.ts" />

namespace App {
    'use strict';

    export function scale(): Function {
        return (virtual: number, realSize: number, virtualSize: number): number => {
            return virtual * realSize / virtualSize;
        }
    }
}
