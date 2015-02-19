/// <reference path="appreferences.ts" />

module App {
    angular.module("app", ["ngCookies", "calc"])
        .service("bodyStorageServ", BodyStorageService)
        .service("antennaStorageServ", AntennaStorageService)
        .service("satChainServ", SatChainService)
        .service("graphicsHelperServ", GraphicsHelperService)
        .service("entireViewServ", EntireViewService)
        .service("nightViewServ", NightViewService)
        .service("deltavViewServ", DeltavViewService)
        .controller("inputCtrl", InputController)
        .controller("bodyEditCtrl", BodyEditController)
        .controller("antennaEditCtrl", AntennaEditController)
        .controller("appCtrl", AppController)
        .filter("antennaType", antennaType);
}
