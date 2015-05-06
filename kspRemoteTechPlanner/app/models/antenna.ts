/// <reference path="../_references.ts" />

module App {
    export class AntennaType {
        static omni: string = "0";
        static dish: string = "1";
    }

    export class Antenna {
        name: string;
        type: AntennaType;
        range: number;
        elcNeeded: number;

        constructor(name: string, type: AntennaType, range: number, elcNeeded: number);
        constructor(antenna: any);
        constructor(data: any, type?: AntennaType, range?: number, elcNeeded?: number) {
            if (type) {
                this.name = data;
                this.type = type;
                this.range = range;
                this.elcNeeded = elcNeeded;
            } else {
                this.name = data.name;
                this.type = data.type;
                this.range = data.range;
                this.elcNeeded = data.elcNeeded;
            }
        }

        clone(): Antenna {
            return new Antenna(this);
        }
    }
}
