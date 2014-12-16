/// <reference path="references.ts" />
module App {
    angular.module("calc", [])
        .service("calc.euclideanServ", Calculator.EuclideanService)
        .service("calc.orbitalServ", Calculator.OrbitalService);

    angular.module("app", ["ngCookies", "calc"])
        .value("antennaStorageCookieKey", "userAntenna")
        .value("bodyStorageCookieKey", "userBody")
        .value("satChainCookieKey", "inputData")
        .service("antennaStorageServ", AntennaStorageService)
        .service("bodyStorageServ", BodyStorageService)
        .service("satChainServ", SatChainService)
        .service("graphicsHelperServ", GraphicsHelperService)
        .service("entireViewServ", EntireViewService)
        .service("nightViewServ", NightViewService)
        .controller("inputCtrl", InputController)
        .controller("appCtrl", AppController);
}
