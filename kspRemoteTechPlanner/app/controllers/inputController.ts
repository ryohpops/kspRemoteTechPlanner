/// <reference path="../appreferences.ts" />

module App {
    export class InputController {
        'use strict';

        satChain: SatChain;
        bodyDetailVisible: boolean;
        antennaDetailVisible: boolean[];

        static $inject = ["$rootScope", "updateViewEvent", "satChainServ", "bodyDictionaryServ", "antennaDictionaryServ"];
        constructor(
            private $rootScope: ng.IRootScopeService,
            private updateViewEvent: string,
            private satChainServ: SatChainService,
            private bodies: BodyDictionaryService,
            private antennas: AntennaDictionaryService
            ) {

            this.satChain = this.satChainServ.satChain;
            this.bodyDetailVisible = false;
            this.antennaDetailVisible = new Array<boolean>();
            for (var i: number = 0; i < this.satChain.antennas.length; i++)
                this.antennaDetailVisible.push(false);
        }

        save() {
            this.satChainServ.save();
        }

        updateView() {
            this.$rootScope.$broadcast(this.updateViewEvent);
        }

        updateBody() {
            var b: Body = this.bodies.get(this.satChain.body.name);
            this.satChain.body.color = b.color;
            this.satChain.body.radius = b.radius;
            this.satChain.body.stdGravity = b.stdGravity;
            this.satChain.body.soi = b.soi;
        }

        updateAntenna(index: number) {
            var a: Antenna = this.antennas.get(this.satChain.antennas[index].antenna.name);
            this.satChain.antennas[index].antenna.type = a.type;
            this.satChain.antennas[index].antenna.range = a.range;
            this.satChain.antennas[index].antenna.elcNeeded = a.elcNeeded;
        }

        isSelectedAntenna(index: number): boolean {
            return this.satChain.antennaIndex === index;
        }

        setAntennaIndex(index: number) {
            this.satChain.antennaIndex = index;
        }

        addNewAntenna() {
            this.satChain.antennas.push({ antenna: this.antennas.get("Reflectron DP-10"), quantity: 1 });
            this.antennaDetailVisible.push(false);
        }

        removeSelectedAntenna() {
            this.satChain.antennas.splice(this.satChain.antennaIndex, 1);
            this.antennaDetailVisible.splice(this.satChain.antennaIndex, 1);
            if (this.satChain.antennaIndex === this.satChain.antennas.length)
                this.satChain.antennaIndex--;
        }
    }
}
