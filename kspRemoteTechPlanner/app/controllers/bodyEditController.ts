/// <reference path="../_references.ts" />

module App {
    'use strict';

    export class BodyEditController {
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

        cancel() {
            this.isInEdit = false;
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

        onValidSubmit() {
            this.isInEdit = false;
            this.bodyDictServ.set(this.editData.name, this.editData);
            this.bodyDictServ.save();

            this.eventServ.updateBody();
            this.eventServ.updateView();
        }
    }
}
