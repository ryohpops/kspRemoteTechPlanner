/// <reference path="../_references.ts" />

namespace App {
    'use strict';

    export class AntennaEditController {
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
            let ret: boolean = false;
            for (let ae of this.sc.antennas) {
                if (ae.antenna.name === name)
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
