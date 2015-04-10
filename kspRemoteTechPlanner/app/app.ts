/// <reference path="appreferences.ts" />

module App {
    angular.module("app", ["ngCookies", "LocalStorageModule", "calc"])
        .config(
        ["localStorageServiceProvider", (lssp: ng.local.storage.ILocalStorageServiceProvider) => {
            lssp.setPrefix("kspRemoteTechPlanner");
        }])
        .value("updateViewEvent", "updateView")
        .service("bodyDictionaryServ", BodyDictionaryService)
        .service("antennaDictionaryServ", AntennaDictionaryService)
        .service("satChainServ", SatChainService)
        .controller("inputCtrl", InputController)
        .controller("entireViewCtrl", EntireViewController)
        .controller("nightViewCtrl", NightViewController)
        .controller("deltavViewCtrl", DeltavViewController)
        .controller("bodyEditCtrl", BodyEditController)
        .controller("antennaEditCtrl", AntennaEditController)
        .filter("antennaType", antennaType)
        .filter("scale", scale);
}
