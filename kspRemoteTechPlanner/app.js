/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="scripts/typings/jquery.validation/jquery.validation.d.ts" />
/// <reference path="scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="model/body.ts" />
/// <reference path="model/bodydata.ts" />
/// <reference path="model/userdata.ts" />
/// <reference path="model/antenna.ts" />
/// <reference path="model/antennadata.ts" />
/// <reference path="model/satellites.ts" />
/// <reference path="view/entireview.ts" />
/// <reference path="view/nightview.ts" />
/// <reference path="view/deltavview.ts" />
// values
var _body;
var _antenna;
var _satellites;

// Entire View
var stageEntire;
var viewEntire;

// Night View
var stageNight;
var viewNight;

// Delta-V View
var stageDeltav;
var viewDeltav;

// startup
$(function () {
    init();
});

// method definitions
function init() {
    // init values
    _body = new Body();
    _antenna = new Antenna();
    _satellites = new Satellites();
    _satellites.antenna = _antenna;
    _satellites.body = _body;

    // init views
    stageEntire = new createjs.Stage($("canvas#entire")[0]);
    viewEntire = new EntireView(stageEntire, 10000, 800);
    viewEntire.body = _body;
    viewEntire.satellites = _satellites;

    stageNight = new createjs.Stage($("canvas#night")[0]);
    viewNight = new NightView(stageNight, 5000, 400);
    viewNight.body = _body;
    viewNight.satellites = _satellites;

    stageDeltav = new createjs.Stage($("canvas#deltav")[0]);
    viewDeltav = new DeltavView(stageDeltav, 5000, 400);
    viewDeltav.body = _body;
    viewDeltav.satellites = _satellites;

    // load user data
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

    // set validator
    $("form#calculator").validate({
        highlight: function (element) {
            $(element).parent("div").addClass("has-error");
        },
        unhighlight: function (element) {
            $(element).parent("div").removeClass("has-error");
        }
    });

    // add event handlers
    $("select#body").on("change", onBodySelect);
    $("button.manual-input#body_detail").on("click", function (ev) {
        $("div.manual-input#body").slideToggle();
    });
    $("button.manual-input#body_reset").on("click", function (ev) {
        onBodySelect(ev);
    });

    $("button.manual-input#body_add").on("click", onUserBodyAdd);
    $("button.manual-input#body_remove").on("click", onUserBodyRemove);

    $("select#antenna").on("change", onAntennaSelect);
    $("button.manual-input#antenna_detail").on("click", function (ev) {
        $("div.manual-input#antenna").slideToggle();
    });
    $("button.manual-input#antenna_reset").on("click", function (ev) {
        onAntennaSelect(ev);
    });

    $("button.manual-input#antenna_add").on("click", onUserAntennaAdd);
    $("button.manual-input#antenna_remove").on("click", onUserAntennaRemove);

    $("form#calculator").find("input,select").on("keypress", function (ev) {
        if (ev.keyCode == 13)
            update();
    });
    $("button#calculate").on("click", function (ev) {
        if (validate())
            update();
    });
    $("button#reset").on("click", function (ev) {
        reset();
    });

    // finallize
    reset();
    update();
}

function update() {
    // update objects
    updateBody();
    updateAntenna();

    _satellites.count = parseInt($("input#count").val());
    _satellites.altitude = parseFloat($("input#altitude").val());
    _satellites.elcConsumption = parseFloat($("input#elcConsumption").val());

    // show objects
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
    onBodySelect(null);
    onAntennaSelect(null);
}

function validate() {
    return validateBody() && validateAntenna() && $("input#count,input#altitude,input#elcConsumption").valid();
}

function validateBody() {
    return $("div.manual-input#body").children("div").children("input").valid();
}

function validateAntenna() {
    return $("div.manual-input#antenna").children("div").children("input").valid();
}

// event handler
// retrieve data of selected body.
function onBodySelect(ev) {
    var b;
    if ($("select#body > optgroup[label='User data']").length == 1)
        b = UserData.userBodies[$("select#body").val()]; // aquire data from UserData first,
    if (b == undefined)
        b = BodyData.getBody($("select#body").val()); // then from BodyData.

    $("input#body_name").val(b.name);
    $("input#body_color").val(b.color);
    $("input#body_radius").val(b.radius.toString());
    $("input#body_stdGravParam").val(b.stdGravParam.toString());
    $("input#body_soi").val(b.soi.toString());

    validateBody(); // execute validation with loaded value to clear validate state.
}

// add new data to user's body
function onUserBodyAdd(ev) {
    if (validateBody())
        updateBody();
    else
        return;

    if (UserData.userBodies[_body.name] == undefined)
        addUserDataSelection("body", _body.name); // add option to body selector.
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

// remove user's body data which has the same name as body_name in body_detail.
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

// retrieve data of selected antenna.
function onAntennaSelect(ev) {
    var a;
    if ($("select#antenna > optgroup[label='User data']").length == 1)
        a = UserData.userAntennas[$("select#antenna").val()]; // aquire data from UserData first,
    if (a == undefined)
        a = AntennaData.getAntenna($("select#antenna").val()); // then from AntennaData.

    $("input#antenna_name").val(a.name);
    if (a.type == 0 /* omni */) {
        $("select#antenna_type").val("omni");
    } else if (a.type == 1 /* dish */) {
        $("select#antenna_type").val("dish");
    }
    $("input#antenna_range").val(a.range.toString());
    $("input#antenna_elcConsumption").val(a.elcConsumption.toString());

    validateAntenna(); // execute validation with loaded value to clear validate state.
}

// add new data to user's antenna
function onUserAntennaAdd(ev) {
    if (validateAntenna())
        updateAntenna();
    else
        return;

    if (UserData.userAntennas[_antenna.name] == undefined)
        addUserDataSelection("antenna", _antenna.name); // add option to antenna selector.
    $("select#antenna").val(_antenna.name);

    var a = new Antenna();
    a.name = _antenna.name;
    a.type = _antenna.type;
    a.range = _antenna.range;
    a.elcConsumption = _antenna.elcConsumption;
    UserData.userAntennas[_antenna.name] = a;
    UserData.saveCookie();
}

// remove user's antenna data which has the same name as antenna_name in antenna_detail.
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

// add select option for user's data to selector.
function addUserDataSelection(data, name) {
    if ($("select#" + data + " > optgroup[label='User data']").length == 0)
        $("select#" + data).append("<optgroup label='User data'></optgroup>"); // make one.
    $("select#" + data + " > optgroup[label='User data']").append("<option>" + name + "</option>"); // add option for user's data to selector.
}

// remove select option for user's data from selector.
function removeUserDataSelection(data, name, isDataRemaining) {
    $("optgroup[label='User data'] > option:contains('" + name + "')").remove();
    if (!isDataRemaining()) {
        $("select#" + data + " > optgroup[label='User data']").remove(); // remove User data option-group.
    }
}
//# sourceMappingURL=app.js.map
