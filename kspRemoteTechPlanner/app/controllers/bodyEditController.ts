/// <reference path="../_references.ts" />

module App {
    export class BodyEditController {
        'use strict';

        userBodies: BodyDictionary;
        satChain: SatChain;
        isInEdit: boolean;
        editData: Body;

        static $inject = ["$rootScope", "updateViewEvent", "bodyDictServ", "satChainServ"];
        constructor(
            private $rootScope: ng.IRootScopeService,
            private updateViewEvent: string,
            private bodyDictServ: BodyDictionaryService,
            private satChainServ: SatChainService
            ) {

            this.userBodies = bodyDictServ.userBodies;
            this.satChain = satChainServ.satChain;
            this.isInEdit = false;
            this.editData = undefined;
        }

        isUsed(name: string): boolean {
            return this.satChain.body.name === name;
        }

        add() {
            this.editData = { name: "", color: "", radius: 0, stdGravity: 0, soi: 0 };
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

        updateView() {
            this.$rootScope.$broadcast(this.updateViewEvent);
        }
    }
}
