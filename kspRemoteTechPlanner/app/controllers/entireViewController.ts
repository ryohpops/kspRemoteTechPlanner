/// <reference path="../appreferences.ts" />

module App {
    import Point = Calculator.Point;

    export class EntireViewController {
        'use strict';

        real: number = 800;
        get virtual(): number {
            return (this.body.radius + this.sc.altitude + this.satChainServ.selectedAntenna.range) * 2 * 1.05;
        }

        sc: SatChain;
        body: Body;
        position: Point[];
        connection: boolean[];
        distance: number[];
        get hasStable(): boolean {
            return this.satelliteServ.hasStableArea(this.body.radius, this.sc.count, this.sc.altitude, this.satChainServ.selectedAntenna.range);
        }
        get stableAltitude(): number {
            return this.satelliteServ.stableLimitAltitude(this.body.radius, this.sc.count, this.sc.altitude, this.satChainServ.selectedAntenna.range);
        }

        static $inject = ["$rootScope", "updateViewEvent", "satChainServ", "calc.orbitalServ", "calc.satelliteServ"];
        constructor(
            private $rootScope: ng.IRootScopeService,
            private updateViewEvent: string,
            private satChainServ: SatChainService,
            private orbitalServ: Calculator.OrbitalService,
            private satelliteServ: Calculator.SatelliteService
            ) {

            this.sc = this.satChainServ.satChain;
            this.body = this.sc.body;
            this.position = [];
            this.connection = [];
            this.distance = [];

            $rootScope.$on(this.updateViewEvent,(event: ng.IAngularEvent) => {
                this.updatePosition();
                this.updateConnectStatus();
            });
            $rootScope.$emit(this.updateViewEvent);
        }

        private updatePosition() {
            var pos = this.satelliteServ.position(this.body.radius, this.sc.count, this.sc.altitude);

            this.position.splice(pos.length);
            for (var index in pos)
                this.position[index] = pos[index];
        }

        private updateConnectStatus() {
            var conn: boolean[] = this.satelliteServ.connectability(
                this.body.radius, this.sc.count, this.sc.altitude, this.satChainServ.selectedAntenna.range);
            var dist: number[] = this.satelliteServ.distance(this.body.radius, this.sc.count, this.sc.altitude);

            var count: number = this.sc.count <= 4 ? 1 : 2;
            this.connection.splice(count);
            this.distance.splice(count);
            for (var i: number = 0; i < count; i++) {
                this.connection[i] = conn[i + 1];
                this.distance[i] = dist[i + 1];
            }
        }
    }
}
