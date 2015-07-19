/// <reference path="../_references.ts" />

module App {
    'use strict';

    export class StockData {
        static stock: string = "stock";
        static rss: string = "rss";
    }

    export class RangeModelType {
        static standard: string = "standard";
        static root: string = "root";
    }

    export class Settings {
        stockData: string;
        rangeMultiplier: number;
        rangeModelType: string;
        multipleAntennaMultiplier: number;

        constructor(stockData: string, rangeMultiplier: number, rangeModelType: string, multipleAntennaMultiplier: number) {
            this.stockData = stockData;
            this.rangeMultiplier = rangeMultiplier;
            this.rangeModelType = rangeModelType;
            this.multipleAntennaMultiplier = multipleAntennaMultiplier;
        }
    }

    export interface SettingsJSON {
        stockData: string;
        rangeMultiplier: number;
        rangeModelType: string;
        multipleAntennaMultiplier: number;
    }
}
