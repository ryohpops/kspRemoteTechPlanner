/// <reference path="../appreferences.ts" />

module App {
    export class AntennaEditController {
        'use strict';

        userAntennas: AntennaDictionary;
        satChain: SatChain;
        isInEdit: boolean;
        editData: Antenna;

        static $inject = ["antennaStorageServ", "satChainServ"];
        constructor(
            private antennaStorageServ: AntennaStorageService,
            private satChainServ: SatChainService
            ) {

            this.userAntennas = antennaStorageServ.userAntennas;
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
            this.editData = new Antenna("", AntennaType.omni, 0, 0);
            this.isInEdit = true;
        }

        edit(name: string) {
            this.editData = this.antennaStorageServ.getAntenna(name);
            this.isInEdit = true;
        }

        remove(name: string) {
            this.isInEdit = false;
            this.antennaStorageServ.removeAntenna(name);
            this.antennaStorageServ.save();
        }

        save() {
            this.isInEdit = false;
            this.antennaStorageServ.setAntenna(this.editData.name, this.editData);
            this.antennaStorageServ.save();
        }

        cancel() {
            this.isInEdit = false;
        }
    }
}
