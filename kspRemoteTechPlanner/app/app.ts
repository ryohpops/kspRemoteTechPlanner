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
        .service("graphicsHelperServ", GraphicsHelperService)
        .service("entireViewServ", EntireViewService)
        .service("nightViewServ", NightViewService)
        .service("deltavViewServ", DeltavViewService)
        .controller("inputCtrl", InputController)
        .controller("bodyEditCtrl", BodyEditController)
        .controller("antennaEditCtrl", AntennaEditController)
        .filter("antennaType", antennaType);
}
