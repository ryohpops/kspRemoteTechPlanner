/// <reference path="calculatorreferences.ts" />

module Calculator {
    angular.module("calc", [])
        .service("calc.euclideanServ", Calculator.EuclideanService)
        .service("calc.orbitalServ", Calculator.OrbitalService)
        .service("calc.satelliteServ", Calculator.SatelliteService);
}
