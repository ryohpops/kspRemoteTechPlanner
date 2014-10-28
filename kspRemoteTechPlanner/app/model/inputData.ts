/// <reference path="../references.ts" />

class InputData extends CookieConnector {
    'use strict';

    private static cookieKey: string = "inputData";

    satellites: Satellites;

    constructor() {
        super(InputData.cookieKey);
    }

    pull() {

    }

    push() {

    }

    save() {
        this.saveCookie(this.satellites);
    }

    restore() {
        this.satellites = this.loadCookie();
    }
}