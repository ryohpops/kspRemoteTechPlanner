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
        for (var item in document.cookie.split(";")) {
            if (item.indexOf(this.key) == 0) {
                return JSON.parse(decodeURIComponent(item.split("=")[1]));
            }
        }
    }
}