/// <reference path="references.ts" />
module App {
    angular.module("calculator", [])
        .service("calculator.euclidean", Calculator.EuclideanService)
        .service("calculator.orbital", Calculator.OrbitalService);

    angular.module("app", ["ngCookies", "calculator"])
        .value("satChainCookieKey", "satChain")
        .service("satChain", SatChainService)
        .controller("input", InputController);
}
