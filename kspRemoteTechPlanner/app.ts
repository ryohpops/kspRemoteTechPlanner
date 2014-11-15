/// <reference path="references.ts" />
module App {
    angular.module("calc", [])
        .service("calc.euclideanServ", Calculator.EuclideanService)
        .service("calc.orbitalServ", Calculator.OrbitalService);

    angular.module("app", ["ngCookies", "calc"])
        .value("satChainCookieKey", "satChain")
        .service("satChainServ", SatChainService)
        .controller("inputCtrl", InputController);
}
