/// <reference path="references.ts" />

module App {
    angular.module("calc", [])
        .service("calc.euclideanServ", Calculator.EuclideanService)
        .service("calc.orbitalServ", Calculator.OrbitalService);

    angular.module("app", ["ngCookies", "calc"])
        .value("bodyStorageCookieKey", "userBody")
        .value("antennaStorageCookieKey", "userAntenna")
        .value("satChainCookieKey", "inputData")
        .value("entireViewTarget", "entire")
        .value("nightViewTarget", "night")
        .value("deltavViewTarget", "deltav")
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
        .controller("appCtrl", AppController);
}
