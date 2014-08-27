var _body;
var _antenna;
var _satellites;

var stageEntire;
var viewEntire;

var stageNight;
var viewNight;

var stageDeltav;
var viewDeltav;

$(function () {
    init();
});

function init() {
    _body = new Body();
    _antenna = new Antenna();
    _satellites = new Satellites();
    _satellites.antenna = _antenna;
    _satellites.body = _body;

    stageEntire = new createjs.Stage($("canvas#entire")[0]);
    viewEntire = new EntireView(stageEntire, 10000, 800);
    viewEntire.satellites = _satellites;

    stageNight = new createjs.Stage($("canvas#night")[0]);
    viewNight = new NightView(stageNight, 5000, 400);
    viewNight.satellites = _satellites;

    stageDeltav = new createjs.Stage($("canvas#deltav")[0]);
    viewDeltav = new DeltavView(stageDeltav, 5000, 400);
    viewDeltav.satellites = _satellites;

    var cookieExists = UserData.loadCookie();
    if (cookieExists.body) {
        for (var i in UserData.userBodies) {
            addUserDataSelection("body", UserData.userBodies[i].name);
        }
    }
    if (cookieExists.antenna) {
        for (var i in UserData.userAntennas) {
            addUserDataSelection("antenna", UserData.userAntennas[i].name);
        }
    }

    $("form#calculator").validate({
        highlight: function (element) {
            $(element).parent("div").addClass("has-error");
        },
        unhighlight: function (element) {
            $(element).parent("div").removeClass("has-error");
        }
    });

    $("select#body").on("change", onBodySelect);
    $("button.manual-input#body_detail").on("click", function (ev) {
        $("div.manual-input#manual_body").slideToggle();
    });
    $("button.manual-input#body_reset").on("click", function (ev) {
        onBodySelect(ev);
    });

    $("button.manual-input#body_add").on("click", onUserBodyAdd);
    $("button.manual-input#body_remove").on("click", onUserBodyRemove);

    $("select#antenna").on("change", onAntennaSelect);
    $("button.manual-input#antenna_detail").on("click", function (ev) {
        $("div.manual-input#manual_antenna").slideToggle();
    });
    $("button.manual-input#antenna_reset").on("click", function (ev) {
        onAntennaSelect(ev);
    });

    $("button.manual-input#antenna_add").on("click", onUserAntennaAdd);
    $("button.manual-input#antenna_remove").on("click", onUserAntennaRemove);

    $("form#calculator").find("input,select").on("keypress", function (ev) {
        if (ev.keyCode == 13 && validate())
            update();
    });
    $("button#calculate").on("click", function (ev) {
        if (validate())
            update();
    });
    $("button#reset").on("click", function (ev) {
        reset();
    });

    reset();
    update();
}

function update() {
    updateBody();
    updateAntenna();

    _satellites.count = parseInt($("input#count").val());
    _satellites.altitude = parseFloat($("input#altitude").val());
    _satellites.elcConsumption = parseFloat($("input#elcConsumption").val());
    _satellites.parkingAltitude = parseFloat($("input#parkingAltitude").val());

    viewEntire.innerSize = (_body.radius + _satellites.altitude + _antenna.range) * 2 * 1.05;

    viewEntire.show();
    stageEntire.update();
    viewNight.show();
    stageNight.update();
    viewDeltav.show();
    stageDeltav.update();
}

function updateBody() {
    _body.name = $("input#body_name").val();
    _body.color = $("input#body_color").val();
    _body.radius = parseFloat($("input#body_radius").val());
    _body.stdGravParam = parseFloat($("input#body_stdGravParam").val());
    _body.soi = parseFloat($("input#body_soi").val());
}

function updateAntenna() {
    _antenna.name = $("input#antenna_name").val();
    if ($("select#antenna_type").val() == "omni") {
        _antenna.type = 0 /* omni */;
    } else if ($("select#antenna_type").val() == "dish") {
        _antenna.type = 1 /* dish */;
    }
    _antenna.range = parseFloat($("input#antenna_range").val());
    _antenna.elcConsumption = parseFloat($("input#antenna_elcConsumption").val());
}

function reset() {
    $("select#body").val("Kerbin");
    $("input#count").val((4).toString());
    $("input#altitude").val((1000).toString());
    $("input#elcConsumption").val((0.01).toString());
    $("select#antenna").val("Communotron 16");
    $("input#parkingAltitude").val((70).toString());
    onBodySelect(null);
    onAntennaSelect(null);
}

function validate() {
    return validateBody() && validateAntenna() && $("input#count,input#altitude,input#elcConsumption").valid();
}

function validateBody() {
    return $("div.manual-input#manual_body").children("div").children("input").valid();
}

function validateAntenna() {
    return $("div.manual-input#manual_antenna").children("div").children("input").valid();
}

function onBodySelect(ev) {
    var b;
    if ($("select#body > optgroup[label='User data']").length == 1)
        b = UserData.userBodies[$("select#body").val()];
    if (b == undefined)
        b = BodyData.getBody($("select#body").val());

    $("input#body_name").val(b.name);
    $("input#body_color").val(b.color);
    $("input#body_radius").val(b.radius.toString());
    $("input#body_stdGravParam").val(b.stdGravParam.toString());
    $("input#body_soi").val(b.soi.toString());

    validateBody();
}

function onUserBodyAdd(ev) {
    if (validateBody())
        updateBody();
    else
        return;

    if (UserData.userBodies[_body.name] == undefined)
        addUserDataSelection("body", _body.name);
    $("select#body").val(_body.name);

    var b = new Body();
    b.name = _body.name;
    b.color = _body.color;
    b.radius = _body.radius;
    b.stdGravParam = _body.stdGravParam;
    b.soi = _body.soi;
    UserData.userBodies[_body.name] = b;
    UserData.saveCookie();
}

function onUserBodyRemove(ev) {
    if ($("input#body_name").valid())
        delete UserData.userBodies[$("input#body_name").val()];
    else
        return;
    UserData.saveCookie();
    removeUserDataSelection("body", $("input#body_name").val(), function () {
        return UserData.loadCookie().body;
    });
}

function onAntennaSelect(ev) {
    var a;
    if ($("select#antenna > optgroup[label='User data']").length == 1)
        a = UserData.userAntennas[$("select#antenna").val()];
    if (a == undefined)
        a = AntennaData.getAntenna($("select#antenna").val());

    $("input#antenna_name").val(a.name);
    if (a.type == 0 /* omni */) {
        $("select#antenna_type").val("omni");
    } else if (a.type == 1 /* dish */) {
        $("select#antenna_type").val("dish");
    }
    $("input#antenna_range").val(a.range.toString());
    $("input#antenna_elcConsumption").val(a.elcConsumption.toString());

    validateAntenna();
}

function onUserAntennaAdd(ev) {
    if (validateAntenna())
        updateAntenna();
    else
        return;

    if (UserData.userAntennas[_antenna.name] == undefined)
        addUserDataSelection("antenna", _antenna.name);
    $("select#antenna").val(_antenna.name);

    var a = new Antenna();
    a.name = _antenna.name;
    a.type = _antenna.type;
    a.range = _antenna.range;
    a.elcConsumption = _antenna.elcConsumption;
    UserData.userAntennas[_antenna.name] = a;
    UserData.saveCookie();
}

function onUserAntennaRemove(ev) {
    if ($("input#antenna_name").valid())
        delete UserData.userAntennas[$("input#antenna_name").val()];
    else
        return;
    UserData.saveCookie();
    removeUserDataSelection("antenna", $("input#antenna_name").val(), function () {
        return UserData.loadCookie().antenna;
    });
}

function addUserDataSelection(data, name) {
    if ($("select#" + data + " > optgroup[label='User data']").length == 0)
        $("select#" + data).append("<optgroup label='User data'></optgroup>");
    $("select#" + data + " > optgroup[label='User data']").append("<option>" + name + "</option>");
}

function removeUserDataSelection(data, name, isDataRemaining) {
    $("optgroup[label='User data'] > option:contains('" + name + "')").remove();
    if (!isDataRemaining()) {
        $("select#" + data + " > optgroup[label='User data']").remove();
    }
}
