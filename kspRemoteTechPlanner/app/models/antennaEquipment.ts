/// <reference path="../appreferences.ts" />
 
module App {
    export class AntennaEquipment implements IAntennaEquipment{
        antenna: Antenna;
        quantity: number;

        get elcNeeded(): number {
            return this.antenna.elcNeeded * this.quantity;
        }

        constructor(antenna: Antenna, quantity: number) {
            this.antenna = antenna;
            this.quantity = quantity;
        }
    }
}
