/// <reference path="references.ts" />

// startup
$(() => {
    App.run();
});

module App {
    'use strict';

    // values
    var input: InputData;
    var bodies: BodyData;
    var antennas: AntennaData;

    var viewEntire: EntireView;
    var viewNight: NightView;
    var viewDeltav: DeltavView;

    // method definitions
    export function run() {
        // init values
        input = new InputData();
        bodies = new BodyData();
        antennas = new AntennaData();

        // init views
        viewEntire = new EntireView(new createjs.Stage($("canvas#entire")[0]), 10000, 840, input.satellites);
        viewNight = new NightView(new createjs.Stage($("canvas#night")[0]), 5000, 400, input.satellites);
        viewDeltav = new DeltavView(new createjs.Stage($("canvas#deltav")[0]), 5000, 400, input.satellites);

        // load user data
        if (bodies.load()) {
            for (var bodyName in bodies.userBodies) {
                addUserDataSelection("body", bodies.getBody(bodyName).name);
            }
        }
        if (antennas.load()) {
            for (var antennaName in antennas.userAntennas) {
                addUserDataSelection("antenna", antennas.getAntenna(antennaName).name);
            }
        }

        // set validator
        $("form#calculator").validate({
            highlight: function (element) { $(element).parent("div").addClass("has-error") },
            unhighlight: function (element) { $(element).parent("div").removeClass("has-error") }
        });

        // add event handlers
        $("select#body").change(onBodySelect);
        $("button.manual-input#body_detail").click((ev) => { $("div.manual-input#manual_body").slideToggle() });
        $("button.manual-input#body_reset").click((ev) => { onBodySelect(ev) });

        $("button.manual-input#body_add").click(onUserBodyAdd);
        $("button.manual-input#body_remove").click(onUserBodyRemove);

        $("select#antenna").change(onAntennaSelect);
        $("button.manual-input#antenna_detail").click((ev) => { $("div.manual-input#manual_antenna").slideToggle() });
        $("button.manual-input#antenna_reset").click((ev) => { onAntennaSelect(ev) });

        $("button.manual-input#antenna_add").click(onUserAntennaAdd);
        $("button.manual-input#antenna_remove").click(onUserAntennaRemove);

        $("form#calculator").find("input,select").keypress((ev) => { if (ev.keyCode == 13 && validAll()) update() });
        $("button#calculate").click((ev) => { if (validAll()) update() });
        $("button#reset").click((ev) => { });

        // finallize
        if (input.load()) {
            input.push();
        } else {
            input.reset();
            onBodySelect(null);
            onAntennaSelect(null);
        }
        update();
    }

    function update() {
        input.pull();
        input.save();

        viewEntire.innerSize = (input.satellites.body.radius + input.satellites.altitude + input.satellites.antenna.range) * 2 * 1.05;
        viewEntire.show();
        viewNight.show();
        viewDeltav.show();
    }

    function validAll(): boolean {
        return validBody() && validAntenna() && $("input#count,input#altitude,input#elcConsumption").valid();
    }

    function validBody(): boolean {
        return $("div.manual-input#manual_body").children("div").children("input").valid();
    }

    function validAntenna(): boolean {
        return $("div.manual-input#manual_antenna").children("div").children("input").valid();
    }

    // event handler
    // retrieve data of selected body.
    function onBodySelect(ev) {
        var b: Body = bodies.getBody($("select#body").val());
        for (var property in b) {
            input.satellites.body[property] = b[property];
        }

        input.pushBody();
        validBody(); // execute validation with loaded value to clear validate state.
    }

    // add new data to user's body
    function onUserBodyAdd(ev) {
        if (validBody()) {
            input.pullBody();

            if (bodies.stockBodies[input.satellites.body.name] == undefined) {
                if (bodies.userBodies[input.satellites.body.name] == undefined)   // if the same name body is not defined yet,
                    addUserDataSelection("body", input.satellites.body.name);     // add option to body selector.
                $("select#body").val(input.satellites.body.name);

                bodies.userBodies[input.satellites.body.name] = new Body(input.satellites.body.name, input.satellites.body.color, input.satellites.body.radius,
                    input.satellites.body.stdGravParam, input.satellites.body.soi); // create or update current body.
                bodies.save();
            }
        }
    }

    // remove user's body data which has the same name as body_name in body_detail.
    function onUserBodyRemove(ev) {
        if ($("input#body_name").valid()) {
            delete bodies.userBodies[$("input#body_name").val()];
            bodies.save();

            removeUserDataSelection("body", $("input#body_name").val());
        }
    }

    // retrieve data of selected antenna.
    function onAntennaSelect(ev) {
        var a: Antenna = antennas.getAntenna($("select#antenna").val());
        for (var property in a) {
            input.satellites.antenna[property] = a[property];
        }

        input.pushAntenna();
        validAntenna(); // execute validation with loaded value to clear validate state.
    }

    // add new data to user's antenna
    function onUserAntennaAdd(ev) {
        if (validAntenna()) {
            input.pullAntenna();

            if (antennas.stockAntennas[input.satellites.antenna.name] == undefined) {
                if (antennas.userAntennas[input.satellites.antenna.name] == undefined) // if the same name antenna is not defined yet,
                    addUserDataSelection("antenna", input.satellites.antenna.name);    // add option to antenna selector.
                $("select#antenna").val(input.satellites.antenna.name);

                antennas.userAntennas[input.satellites.antenna.name] = new Antenna(input.satellites.antenna.name, input.satellites.antenna.type,
                    input.satellites.antenna.range, input.satellites.antenna.elcConsumption); // create new instance and put data.
                antennas.save();
            }
        }
    }

    // remove user's antenna data which has the same name as antenna_name in antenna_detail.
    function onUserAntennaRemove(ev) {
        if ($("input#antenna_name").valid()) {
            delete antennas.userAntennas[$("input#antenna_name").val()];
            antennas.save();

            removeUserDataSelection("antenna", $("input#antenna_name").val());
        }
    }

    // add select option for user's data to selector.
    function addUserDataSelection(dataType: string, name: string) {
        $("select#" + dataType + " > optgroup[label='User data']").append("<option>" + name + "</option>");
    }

    // remove select option for user's data from selector.
    function removeUserDataSelection(dataType: string, name: string) {
        $("optgroup[label='User data'] > option:contains('" + name + "')").remove();
    }
}
