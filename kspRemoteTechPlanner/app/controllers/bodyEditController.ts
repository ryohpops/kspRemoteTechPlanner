/// <reference path="../appreferences.ts" />

module App {
    export class BodyEditController {
        'use strict';

        userBodies: BodyDictionary;
        satChain: SatChain;
        isInEdit: boolean;
        editData: Body;

        static $inject = ["bodyDictionaryServ", "satChainServ"];
        constructor(
            private bodyDictionaryServ: BodyDictionaryService,
            private satChainServ: SatChainService
            ) {

            this.userBodies = bodyDictionaryServ.userBodies;
            this.satChain = satChainServ.satChain;
            this.isInEdit = false;
            this.editData = undefined;
        }

        isUsed(name: string): boolean {
            return this.satChain.body.name === name;
        }

        add() {
            this.editData = new Body("", "", 0, 0, 0);
            this.isInEdit = true;
        }

        edit(name: string) {
            this.editData = this.bodyDictionaryServ.get(name);
            this.isInEdit = true;
        }

        remove(name: string) {
            this.isInEdit = false;
            this.bodyDictionaryServ.remove(name);
            this.bodyDictionaryServ.save();
        }

        save() {
            this.isInEdit = false;
            this.bodyDictionaryServ.set(this.editData.name, this.editData);
            this.bodyDictionaryServ.save();
        }

        cancel() {
            this.isInEdit = false;
        }
    }
}
