/// <reference path="../_references.ts" />

module App {
    export class BodyEditController {
        'use strict';

        userBodies: BodyDictionary;
        sc: SatChain;
        isInEdit: boolean;
        editData: Body;

        static $inject = ["eventServ", "bodyDictServ", "satChainServ"];
        constructor(
            private eventServ: EventService,
            private bodyDictServ: BodyDictionaryService,
            private satChainServ: SatChainService
            ) {

            this.userBodies = bodyDictServ.userBodies;
            this.sc = satChainServ.satChain;
            this.isInEdit = false;
            this.editData = undefined;
        }

        isUsed(name: string): boolean {
            return this.sc.body.name === name;
        }

        add() {
            this.editData = new Body("", "", 0, 0, 0);
            this.isInEdit = true;
        }

        edit(name: string) {
            this.editData = this.bodyDictServ.get(name);
            this.isInEdit = true;
        }

        remove(name: string) {
            this.isInEdit = false;
            this.bodyDictServ.remove(name);
            this.bodyDictServ.save();
        }

        save() {
            this.isInEdit = false;
            this.bodyDictServ.set(this.editData.name, this.editData);
            this.bodyDictServ.save();
        }

        cancel() {
            this.isInEdit = false;
        }
    }
}
