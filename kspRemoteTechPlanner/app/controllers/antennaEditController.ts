/// <reference path="../appreferences.ts" />

module App {
    export class AntennaEditController {
        'use strict';

        userAntennas: AntennaDictionary;
        satChain: SatChain;
        isInEdit: boolean;
        editData: Antenna;

        static $inject = ["$rootScope", "updateViewEvent", "antennaDictionaryServ", "satChainServ"];
        constructor(
            private $rootScope: ng.IRootScopeService,
            private updateViewEvent: string,
            private antennaDictionaryServ: AntennaDictionaryService,
            private satChainServ: SatChainService
            ) {

            this.userAntennas = antennaDictionaryServ.userAntennas;
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
            this.editData = this.antennaDictionaryServ.get(name);
            this.isInEdit = true;
        }

        remove(name: string) {
            this.isInEdit = false;
            this.antennaDictionaryServ.remove(name);
            this.antennaDictionaryServ.save();
        }

        save() {
            this.isInEdit = false;
            this.antennaDictionaryServ.set(this.editData.name, this.editData);
            this.antennaDictionaryServ.save();
        }

        cancel() {
            this.isInEdit = false;
        }

        updateView() {
            this.$rootScope.$broadcast(this.updateViewEvent);
        }
    }
}
