/// <reference path="../_references.ts" />

namespace App {
    'use strict';

    export interface LoadResult {
        data: any;
        version: number;
    }

    export class StorageService {
        static $inject = ["$cookieStore", "localStorageService"];
        constructor(
            private $cookieStore: angular.cookies.ICookiesService,
            private localStorage: angular.local.storage.ILocalStorageService
            ) {

        }

        load(dataKey: string, versionKey: string): LoadResult {
            let savedData: any = this.localStorage.get<any>(dataKey); // JSON object, potential of old-version model
            if (!savedData) {
                savedData = this.$cookieStore.get(dataKey); // deprecated, will be deleted in the near future.
                this.$cookieStore.remove(dataKey);
            }
            let savedVersion: number = this.localStorage.get<number>(versionKey);

            return { data: savedData, version: savedVersion };
        }

        setVersion(versionKey: string, modelVersion: number) {
            this.localStorage.set<number>(versionKey, modelVersion);
        }

        save(dataKey: string, data: any) {
            if (Object.keys(data).length > 0)
                this.localStorage.set<any>(dataKey, data);
            else
                this.localStorage.remove(dataKey);
        }

        reset() {
            this.localStorage.clearAll();
        }
    }
}
