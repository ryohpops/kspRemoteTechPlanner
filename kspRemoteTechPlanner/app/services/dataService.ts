/// <reference path="../appreferences.ts" />

module App {
    export interface UpdaterFunction<T> {
        (savedData: any, oldVersion: number): T;
    }

    // virtual
    export class DataService<T> {
        'use strict';

        private dataKey: string;
        private versionKey: string;
        private modelVersion: number;

        private _data: T;
        get data(): T { return this._data; }

        constructor(
            private $cookieStore: ng.cookies.ICookieStoreService,
            private localStorage: ng.local.storage.ILocalStorageService<any>,
            defaultData: T,
            dataKey: string,
            versionKey: string,
            modelVersion: number,
            updater: UpdaterFunction<T>
            ) {

            this.dataKey = dataKey;
            this.versionKey = versionKey;
            this.modelVersion = modelVersion;

            var loaded: T = this.load(updater);
            if (loaded)
                this._data = loaded;
            else
                this._data = defaultData;

            this.localStorage.set(this.versionKey, this.modelVersion);
        }

        private load(updater: UpdaterFunction<T>): T {
            var savedData: any = this.localStorage.get(this.dataKey); // JSON object, potential of old-version model
            if (!savedData) {
                savedData = this.$cookieStore.get(this.dataKey); // deprecated, will be deleted in the near future.
                this.$cookieStore.remove(this.dataKey);
            }
            var savedVersion: number = this.localStorage.get(this.versionKey);

            if (savedData) {
                return updater(savedData, savedVersion);
            } else {
                return undefined;
            }
        }

        save() {
            this.localStorage.set(this.dataKey, this.data);
        }
    }
}
