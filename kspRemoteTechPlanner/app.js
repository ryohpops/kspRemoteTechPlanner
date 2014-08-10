/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="model/body.ts" />
/// <reference path="model/bodydata.ts" />
/// <reference path="model/satellites.ts" />
/// <reference path="view/entireview.ts" />
/// <reference path="view/nightview.ts" />
// values
var body;
var satellites;

// Entire View
var stageEntire;
var viewEntire;

// Night View
var stageNight;
var viewNight;

// startup
$(function () {
    init();
});

// method definitions
function init() {
    // init values
    body = new Body();
    satellites = new Satellites();

    // init views
    stageEntire = new createjs.Stage($("canvas#entire")[0]);
    viewEntire = new EntireView(stageEntire, 10000, 800);

    stageNight = new createjs.Stage($("canvas#night")[0]);
    viewNight = new NightView(stageNight, 5000, 400);

    // init controls
    $("button.manual-input#body").on("click", function (ev) {
        $("div.manual-input#body").slideToggle();
    });
    $("button#calculate").on("click", function (ev) {
        update();
    });

    update();
}

function update() {
    // update objects
    var b = BodyData.getBody($("select#body").val());
    body.name = b.name;
    body.color = b.color;
    body.radius = b.radius;
    body.stdGravParam = b.stdGravParam;
    satellites.body = body;
    satellites.count = parseInt($("input#count").val());
    satellites.altitude = parseFloat($("input#altitude").val());
    satellites.range = parseFloat($("input#range").val());
    satellites.elcConsumption = parseFloat($("input#elcConsumption").val());

    // show objects
    viewEntire.show();
    stageEntire.update();
    viewNight.show();
    stageNight.update();
}
//# sourceMappingURL=app.js.map
