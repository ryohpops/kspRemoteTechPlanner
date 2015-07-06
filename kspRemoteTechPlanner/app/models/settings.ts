/// <reference path="../_references.ts" />

module App {
    'use strict';

    export class StockData {
        static stock: string = "stock";
        static rss: string = "rss";
    }

    export class Settings {
        stockData: string;

        constructor(stockData: string) {
            this.stockData = stockData;
        }
    }

    export interface SettingsJSON {
        stockData: string;
    }
}
