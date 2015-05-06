/// <reference path="../_references.ts" />

module App {
    export class AntennaEditController {
        'use strict';

        userAntennas: AntennaDictionary;
        satChain: SatChain;
        isInEdit: boolean;
        editData: Antenna;

        static $inject = ["$rootScope", "updateViewEvent", "antennaDictServ", "satChainServ"];
        constructor(
            private $rootScope: ng.IRootScopeService,
            private updateViewEvent: string,
            private antennaDictServ: AntennaDictionaryService,
            private satChainServ: SatChainService
            ) {

            this.userAntennas = antennaDictServ.userAntennas;
            this.satChain = satChainServ.satChain;
            this.isInEdit = false;
            this.editData = undefined;
        }

        isUsed(name: string): boolean {
            var ret: boolean = false;
            for (var index in this.satChain.antennas) {
                if (this.satChain.antennas[index].antenna.name === name)
                    ret = true;
            }
            return ret;
        }

        add() {
            this.editData = { name: "", type: AntennaType.omni, range: 0, elcNeeded: 0 };
            this.isInEdit = true;
        }

        edit(name: string) {
            this.editData = this.antennaDictServ.get(name);
            this.isInEdit = true;
        }

        remove(name: string) {
            this.isInEdit = false;
            this.antennaDictServ.remove(name);
            this.antennaDictServ.save();
        }

        save() {
            this.isInEdit = false;
            this.antennaDictServ.set(this.editData.name, this.editData);
            this.antennaDictServ.save();
        }

        cancel() {
            this.isInEdit = false;
        }

        updateView() {
            this.$rootScope.$broadcast(this.updateViewEvent);
        }
    }
}
