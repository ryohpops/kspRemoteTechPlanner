/// <reference path="../_references.ts" />

module App {
    export class InputController {
        'use strict';

        sc: SatChain;
        bodyDetailVisible: boolean;
        antennaDetailVisible: boolean[];

        static $inject = ["eventServ", "satChainServ", "bodyDictServ", "antennaDictServ"];
        constructor(
            private eventServ: EventService,
            private satChainServ: SatChainService,
            private bodies: BodyDictionaryService,
            private antennas: AntennaDictionaryService
            ) {

            this.sc = this.satChainServ.satChain;
            this.bodyDetailVisible = false;
            this.antennaDetailVisible = new Array<boolean>();
            for (var i: number = 0; i < this.sc.antennas.length; i++)
                this.antennaDetailVisible.push(false);
        }

        isSelectedAntenna(index: number): boolean {
            return this.sc.antennaIndex === index;
        }

        setAntennaIndex(index: number) {
            this.sc.antennaIndex = index;
        }

        addNewAntenna() {
            this.sc.antennas.push({ antenna: this.antennas.get("Reflectron DP-10"), quantity: 1 });
            this.antennaDetailVisible.push(false);
        }

        removeSelectedAntenna() {
            this.sc.antennas.splice(this.sc.antennaIndex, 1);
            this.antennaDetailVisible.splice(this.sc.antennaIndex, 1);
            if (this.sc.antennaIndex === this.sc.antennas.length)
                this.sc.antennaIndex--;
        }
    }
}
