/// <reference path="../appreferences.ts" />

module App {
    export class DuplexDataService<T> extends DataService<T>{
        'use strict';

        private _stock: T;
        get stock(): T { return this._stock; }

        private _dynamic: T;
        get dynamic(): T { return this._dynamic; }

        constructor(
            $cookieStore: ng.cookies.ICookieStoreService,
            localStorage: ng.local.storage.ILocalStorageService<any>,
            stockData: T,
            defaultData: T,
            dataKey: string,
            versionKey: string,
            modelVersion: number,
            updater: UpdaterFunction<T>
            ) {

            super($cookieStore, localStorage, defaultData, dataKey, versionKey, modelVersion, updater);

            this._stock = stockData;
            this._dynamic = this.data;
        }
    }
}
