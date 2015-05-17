/// <reference path="../_references.ts" />

module App {
    import Point = Calculator.Point;
    import calcSat = Calculator.Satellite;

    export class EntireViewController {
        'use strict';

        real: number = 800;
        get virtual(): number {
            return (this.body.radius + this.sc.altitude + this.sc.selectedAntenna.range) * 2 * 1.05;
        }

        sc: SatChain;
        body: Body;
        position: Point[];
        connection: boolean[];
        distance: number[];
        get hasStable(): boolean {
            return calcSat.hasStableArea(this.body.radius, this.sc.count, this.body.radius + this.sc.altitude, this.sc.selectedAntenna.range);
        }
        get stableSma(): number {
            return calcSat.stableLimitSma(this.sc.count, this.body.radius + this.sc.altitude, this.sc.selectedAntenna.range);
        }

        static $inject = ["$rootScope", "updateViewEvent", "satChainServ"];
        constructor(
            private $rootScope: ng.IRootScopeService,
            private updateViewEvent: string,
            private satChainServ: SatChainService
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
            var pos = calcSat.position(this.sc.count, this.body.radius + this.sc.altitude);

            this.position.splice(pos.length);
            for (var index in pos)
                this.position[index] = pos[index];
        }

        private updateConnectStatus() {
            var conn: boolean[] = calcSat.connectability(
                this.body.radius, this.sc.count, this.body.radius + this.sc.altitude, this.sc.selectedAntenna.range);
            var dist: number[] = calcSat.distance(this.sc.count, this.body.radius + this.sc.altitude);

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
