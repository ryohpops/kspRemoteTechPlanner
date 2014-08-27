var UserData;
(function (UserData) {
    var keyBody = "userbody";
    var keyAntenna = "userAntenna";
    UserData.userBodies = {};
    UserData.userAntennas = {};

    function saveCookie() {
        var body = JSON.stringify(UserData.userBodies);
        var antenna = JSON.stringify(UserData.userAntennas);

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
    UserData.saveCookie = saveCookie;

    function loadCookie() {
        var result = { body: false, antenna: false };

        var cookie = document.cookie.split(";");
        for (var i = 0; i < cookie.length; i++) {
            if (cookie[i].indexOf(keyBody) == 0) {
                UserData.userBodies = JSON.parse(decodeURIComponent(cookie[i].split("=")[1]));
                result.body = true;
            } else if (cookie[i].indexOf(keyAntenna) == 0) {
                UserData.userAntennas = JSON.parse(decodeURIComponent(cookie[i].split("=")[1]));
                result.antenna = true;
            }
        }
        return result;
    }
    UserData.loadCookie = loadCookie;
})(UserData || (UserData = {}));
