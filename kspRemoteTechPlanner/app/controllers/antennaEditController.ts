/// <reference path="../_references.ts" />

module App {
    export class AntennaEditController {
        'use strict';

        userAntennas: AntennaDictionary;
        sc: SatChain;
        isInEdit: boolean;
        editData: Antenna;

        static $inject = ["eventServ", "antennaDictServ", "satChainServ"];
        constructor(
            private eventServ: EventService,
            private antennaDictServ: AntennaDictionaryService,
            private satChainServ: SatChainService
            ) {

            this.userAntennas = antennaDictServ.userAntennas;
            this.sc = satChainServ.satChain;
            this.isInEdit = false;
            this.editData = undefined;
        }

        isUsed(name: string): boolean {
            var ret: boolean = false;
            for (var index in this.sc.antennas) {
                if (this.sc.antennas[index].antenna.name === name)
                    ret = true;
            }
            return ret;
        }

        add() {
            this.editData = new Antenna("", AntennaType.omni, 0, 0);
            this.isInEdit = true;
        }

        cancel() {
            this.isInEdit = false;
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

        onValidSubmit() {
            this.isInEdit = false;
            this.antennaDictServ.set(this.editData.name, this.editData);
            this.antennaDictServ.save();

            this.eventServ.updateAntenna();
            this.eventServ.updateView();
        }
    }
}
