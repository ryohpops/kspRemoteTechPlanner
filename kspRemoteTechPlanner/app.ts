/// <reference path="references.ts" />
module App {
    angular.module("calculator", [])
        .service("euclidean", Calculator.EuclideanService)
        .service("orbital", Calculator.OrbitalService);

    angular.module("app", ["ngCookies", "calculator"]);
}
