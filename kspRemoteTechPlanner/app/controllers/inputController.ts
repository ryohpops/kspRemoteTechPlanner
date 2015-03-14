/// <reference path="../appreferences.ts" />

module App {
    export class InputController {
        'use strict';

        satChain: SatChain;
        bodyDetailVisible: boolean;
        antennaDetailVisible: boolean[];

        static $inject = ["satChainServ", "bodyDictionaryServ", "antennaDictionaryServ"];
        constructor(
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

        updateBody() {
            var b: Body = this.bodies.getBody(this.satChain.body.name);
            this.satChain.body.color = b.color;
            this.satChain.body.radius = b.radius;
            this.satChain.body.stdGravity = b.stdGravity;
            this.satChain.body.soi = b.soi;
        }

        updateAntenna(index: number) {
            var a: Antenna = this.antennas.getAntenna(this.satChain.antennas[index].antenna.name);
            this.satChain.antennas[index].antenna.type = a.type;
            this.satChain.antennas[index].antenna.range = a.range;
            this.satChain.antennas[index].antenna.elcNeeded = a.elcNeeded;
        }

        isSelectedAntenna(index: number) {
            return this.satChain.antennaIndex === index;
        }

        setAntennaIndex(index: number) {
            this.satChain.antennaIndex = index;
        }

        addNewAntenna() {
            this.satChain.antennas.push(new AntennaEquipment(this.antennas.getAntenna("Reflectron DP-10"), 1));
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
