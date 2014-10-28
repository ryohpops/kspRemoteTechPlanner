/// <reference path="../references.ts" />

class CookieConnector {
    'use strict';

    saveCookie(key: string, data: any, expires: Date = new Date(2030, 12, 31)) {
        var strData: string = JSON.stringify(data);
        if (strData != "{}") {
            document.cookie = key + "=" + encodeURIComponent(strData) + "; expires=" + expires.toUTCString();
        } else {
            document.cookie = key + "=none; expires=" + new Date(0).toUTCString();
        }
    }

    loadCookie(key: string): any {
        for (var item in document.cookie.split(";")) {
            if (item.indexOf(key) == 0) {
                return JSON.parse(decodeURIComponent(item.split("=")[1]));
            }
        }
    }
}