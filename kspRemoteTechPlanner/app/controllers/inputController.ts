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

        onChange() {
            this.satChainServ.save();
            this.eventServ.updateView();
        }

        onBodyChange() {
            this.eventServ.updateBody();
            this.onChange();
        }

        onAntennaChange() {
            this.eventServ.updateAntenna();
            this.onChange();
        }

        setAntennaIndex(index: number) {
            this.sc.antennaIndex = index;
            this.onChange();
        }

        onAddAntenna() {
            this.sc.antennas.push({ antenna: this.antennas.get("Reflectron DP-10"), quantity: 1 });
            this.antennaDetailVisible.push(false);
            this.onAntennaChange();
        }

        onRemoveSelectedAntenna() {
            this.sc.antennas.splice(this.sc.antennaIndex, 1);
            this.antennaDetailVisible.splice(this.sc.antennaIndex, 1);
            if (this.sc.antennaIndex === this.sc.antennas.length)
                this.sc.antennaIndex--;
            this.onAntennaChange();
        }
    }
}
