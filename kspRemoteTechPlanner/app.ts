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
var body: Body;
var satellites: Satellites;

// Entire View
var stageEntire: createjs.Stage;
var viewEntire: EntireView;

// Night View
var stageNight: createjs.Stage;
var viewNight: NightView;

// startup
$(() => {
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
    $("select#body").on("change", onBodySelect);
    $("button.manual-input#body_detail").on("click", (ev) => { $("div.manual-input#body").slideToggle() });
    $("button.manual-input#body_reset").on("click", (ev) => { onBodySelect(null) });
    $("button#calculate").on("click", (ev) => { update() });

    onBodySelect(null);
    update();
}

function update() {
    // update objects
    body.name = $("input#body_name").val();
    body.color = $("input#body_color").val();
    body.radius = parseFloat($("input#body_radius").val());
    body.stdGravParam = parseFloat($("input#body_stdGravParam").val());
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

// event handler
function onBodySelect(ev) {
    var b: Body = BodyData.getBody($("select#body").val());
    $("input#body_name").val(b.name);
    $("input#body_color").val(b.color);
    $("input#body_radius").val(b.radius.toString());
    $("input#body_stdGravParam").val(b.stdGravParam.toString());
}