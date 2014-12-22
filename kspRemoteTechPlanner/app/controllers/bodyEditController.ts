/// <reference path="../appreferences.ts" />
module App {
    export class BodyEditController {
        'use strict';

        userBodies: { [index: string]: Body };

        static $inject = ["bodyStorageServ"];
        constructor(
            private bodyStorageServ: BodyStorageService
            ) {

            this.userBodies = bodyStorageServ.userBodies;
        }

        exists(name: string): boolean {
            return this.bodyStorageServ.existsInStock(name) || this.bodyStorageServ.existsInUser(name);
        }
    }
}
