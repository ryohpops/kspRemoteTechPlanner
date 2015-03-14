/// <reference path="../appreferences.ts" />

module App {
    // virtual
    export class DuplexDataService<T> extends DataService<T>{
        'use strict';

        private _static: T;
        get static(): T { return this._static; }

        private _dynamic: T;
        get dynamic(): T { return this._dynamic; }

        constructor(
            $cookieStore: ng.cookies.ICookieStoreService,
            localStorage: ng.local.storage.ILocalStorageService<any>,
            staticData: T,
            defaultDynamicData: T,
            dataKey: string,
            versionKey: string,
            modelVersion: number,
            updater: UpdaterFunction<T>
            ) {

            super($cookieStore, localStorage, defaultDynamicData, dataKey, versionKey, modelVersion, updater);

            this._static = staticData;
            this._dynamic = this.data;
        }
    }
}
