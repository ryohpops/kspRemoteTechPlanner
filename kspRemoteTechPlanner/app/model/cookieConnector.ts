/// <reference path="../references.ts" />

class CookieConnector {
    'use strict';

    private key: string;
    private expires: Date;

    constructor(key: string, expires: Date= new Date(2030, 12, 31)) {
        this.key = key;
        this.expires = expires;
    }

    saveCookie(data: any) {
        var strData: string = JSON.stringify(data);
        if (strData != "{}") {
            document.cookie = this.key + "=" + encodeURIComponent(strData) + "; expires=" + this.expires.toUTCString();
        } else {
            document.cookie = this.key + "=none; expires=" + new Date(0).toUTCString();
        }
    }

    loadCookie(): any {
        var spl: string[] = document.cookie.split(";");
        for (var i = 0; i < spl.length; i++) {
            if (spl[i].indexOf(this.key) != -1) {
                return JSON.parse(decodeURIComponent(spl[i].split("=")[1]));
            }
        }
    }
}