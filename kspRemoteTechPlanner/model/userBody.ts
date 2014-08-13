/// <reference path="../scripts/typings/jquery/jquery.d.ts" />

/// <reference path="body.ts" />

module UserBody {
    var key = "userbody";
    export var userBodies: { [index: string]: Body } = {};

    export function saveCookie() {
        var data: string = JSON.stringify(userBodies);
        if (data == "{}") {
            document.cookie = key + "=none; expires=" + new Date(0).toUTCString();
        } else {
            document.cookie = key + "=" + encodeURIComponent(data) + "; expires=" + new Date(2030, 12, 31).toUTCString();
        }
    }

    export function loadCookie(): boolean {
        var cookie: string[] = document.cookie.split(";");
        for (var i: number = 0; i < cookie.length; i++) {
            if (cookie[i].indexOf(key) == 0) {
                userBodies = JSON.parse(decodeURIComponent(cookie[i].split("=")[1]));
                return true;
            }
        }
        return false;
    }
} 