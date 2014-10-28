/// <reference path="../references.ts" />

class InputData extends CookieConnector {
    'use strict';

    private static cookieKey: string = "inputData";

    satellites: Satellites;

    pull() {

    }

    push() {

    }

    save() {
        this.saveCookie(InputData.cookieKey, this.satellites);
    }

    restore() {
        this.satellites = this.loadCookie(InputData.cookieKey);
    }
}