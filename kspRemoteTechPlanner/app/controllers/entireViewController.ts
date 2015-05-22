/// <reference path="../_references.ts" />

module App {
    'use strict';

    import Point = Calculator.Point;
    import calcSat = Calculator.Satellite;

    export class EntireViewController {
        real: number = 800;
        get virtual(): number {
            return (this.sc.body.radius + this.sc.altitude + this.sc.selectedAntenna.range) * 2 * 1.05;
        }

        sc: SatChain;
        position: Point[];
        connection: boolean[];
        distance: number[];
        get hasStable(): boolean {
            return calcSat.hasStableArea(this.sc.body.radius, this.sc.count, this.sc.body.radius + this.sc.altitude, this.sc.selectedAntenna.range);
        }
        get stableSma(): number {
            return calcSat.stableLimitSma(this.sc.count, this.sc.body.radius + this.sc.altitude, this.sc.selectedAntenna.range);
        }

        static $inject = ["eventServ", "satChainServ"];
        constructor(
            private eventServ: EventService,
            private satChainServ: SatChainService
            ) {

            this.sc = this.satChainServ.satChain;
            this.position = [];
            this.connection = [];
            this.distance = [];

            eventServ.on(Events.updateView,(event: angular.IAngularEvent) => {
                this.updatePosition();
                this.updateConnectStatus();
            });
            eventServ.updateView();
        }

        private updatePosition() {
            var pos = calcSat.position(this.sc.count, this.sc.body.radius + this.sc.altitude);

            this.position.splice(pos.length);
            for (var index in pos)
                this.position[index] = pos[index];
        }

        private updateConnectStatus() {
            var conn: boolean[] = calcSat.connectability(
                this.sc.body.radius, this.sc.count, this.sc.body.radius + this.sc.altitude, this.sc.selectedAntenna.range);
            var dist: number[] = calcSat.distance(this.sc.count, this.sc.body.radius + this.sc.altitude);

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
