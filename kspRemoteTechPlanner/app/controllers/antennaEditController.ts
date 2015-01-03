/// <reference path="../appreferences.ts" />
module App {
    export class AntennaEditController {
        'use strict';

        userAntennas: AntennaDictionary;
        isInEdit: boolean;
        editData: Antenna;

        static $inject = ["antennaStorageServ"];
        constructor(
            private antennaStorageServ: AntennaStorageService
            ) {

            this.userAntennas = antennaStorageServ.userAntennas;
            this.isInEdit = false;
            this.editData = undefined;
        }

        exists(name: string): boolean {
            return this.antennaStorageServ.existsInStock(name) || this.antennaStorageServ.existsInUser(name);
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
