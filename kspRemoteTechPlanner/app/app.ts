/// <reference path="_references.ts" />

module App {
    'use strict';

    angular.module("app", ["ngCookies", "LocalStorageModule"])
        .config(
        ["localStorageServiceProvider", (lssp: angular.local.storage.ILocalStorageServiceProvider) => {
            lssp.setPrefix("kspRemoteTechPlanner");
        }])
        .service("settingsServ", SettingsService)
        .service("eventServ", EventService)
        .service("storageServ", StorageService)
        .service("bodyDictServ", BodyDictionaryService)
        .service("antennaDictServ", AntennaDictionaryService)
        .service("satChainServ", SatChainService)
        .controller("settingsCtrl", SettingsController)
        .controller("inputCtrl", InputController)
        .controller("entireViewCtrl", EntireViewController)
        .controller("nightViewCtrl", NightViewController)
        .controller("singleLaunchViewCtrl", SingleLaunchViewController)
        .controller("multiLaunchViewCtrl", MultiLaunchViewController)
        .controller("bodyEditCtrl", BodyEditController)
        .controller("antennaEditCtrl", AntennaEditController)
        .directive("foldingDetail", foldingDetail)
        .filter("antennaType", antennaType)
        .filter("format", format)
        .filter("scale", scale);
}
