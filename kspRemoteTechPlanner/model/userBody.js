/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="body.ts" />
var UserBody;
(function (UserBody) {
    var key = "userbody";
    UserBody.userBodies = {};

    function saveCookie() {
        var data = JSON.stringify(UserBody.userBodies);
        if (data == "{}") {
            document.cookie = key + "=none; expires=" + new Date(0).toUTCString();
        } else {
            document.cookie = key + "=" + encodeURIComponent(data) + "; expires=" + new Date(2030, 12, 31).toUTCString();
        }
    }
    UserBody.saveCookie = saveCookie;

    function loadCookie() {
        var cookie = document.cookie.split(";");
        for (var i = 0; i < cookie.length; i++) {
            if (cookie[i].indexOf(key) == 0) {
                UserBody.userBodies = JSON.parse(decodeURIComponent(cookie[i].split("=")[1]));
                return true;
            }
        }
        return false;
    }
    UserBody.loadCookie = loadCookie;
})(UserBody || (UserBody = {}));
//# sourceMappingURL=userBody.js.map
