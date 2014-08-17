/// <reference path="../scripts/typings/jquery/jquery.d.ts" />

/// <reference path="body.ts" />
/// <reference path="antenna.ts" />

module UserData {
    export interface loadCookieResult {
        body: boolean;
        antenna: boolean;
    }

    var keyBody = "userbody";
    var keyAntenna = "userAntenna";
    export var userBodies: { [index: string]: Body } = {};
    export var userAntennas: { [index: string]: Antenna } = {};

    export function saveCookie() {
        var body: string = JSON.stringify(userBodies);
        var antenna: string = JSON.stringify(userAntennas);

        if (body == "{}") {
            document.cookie = keyBody + "=none; expires=" + new Date(0).toUTCString();
        } else {
            document.cookie = keyBody + "=" + encodeURIComponent(body) + "; expires=" + new Date(2030, 12, 31).toUTCString();
        }

        if (antenna == "{}") {
            document.cookie = keyAntenna + "=none; expires=" + new Date(0).toUTCString();
        } else {
            document.cookie = keyAntenna + "=" + encodeURIComponent(antenna) + "; expires=" + new Date(2030, 12, 31).toUTCString();
        }
    }

    export function loadCookie(): loadCookieResult {
        var result: loadCookieResult = { body: false, antenna: false };

        var cookie: string[] = document.cookie.split(";");
        for (var i: number = 0; i < cookie.length; i++) {
            if (cookie[i].indexOf(keyBody) == 0) {
                userBodies = JSON.parse(decodeURIComponent(cookie[i].split("=")[1]));
                result.body = true;
            }
            else if (cookie[i].indexOf(keyAntenna) == 0) {
                userAntennas = JSON.parse(decodeURIComponent(cookie[i].split("=")[1]));
                result.antenna = true;
            }
        }
        return result;
    }
} 