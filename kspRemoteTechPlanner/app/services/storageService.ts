/// <reference path="../_references.ts" />

module App {
    export interface LoadResult {
        data: any;
        version: number;
    }

    export class StorageService {
        'use strict';

        static $inject = ["$cookieStore", "localStorageService"];
        constructor(
            private $cookieStore: ng.cookies.ICookieStoreService,
            private localStorage: ng.local.storage.ILocalStorageService<any>
            ) {
            
        }

        load(dataKey: string, versionKey: string): LoadResult {
            var savedData: any = this.localStorage.get(dataKey); // JSON object, potential of old-version model
            if (!savedData) {
                savedData = this.$cookieStore.get(dataKey); // deprecated, will be deleted in the near future.
                this.$cookieStore.remove(dataKey);
            }
            var savedVersion: number = this.localStorage.get(versionKey);

            return { data: savedData, version: savedVersion };
        }

        setVersion(versionKey: string, modelVersion: number) {
            this.localStorage.set(versionKey, modelVersion);
        }

        save(dataKey: string, data: any) {
            if (Object.keys(data).length > 0)
                this.localStorage.set(dataKey, data);
            else
                this.localStorage.remove(dataKey);
        }
    }
}
