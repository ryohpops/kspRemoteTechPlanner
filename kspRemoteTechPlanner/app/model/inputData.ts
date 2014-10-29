/// <reference path="../references.ts" />

class InputData extends CookieConnector {
    'use strict';

    private static cookieKey: string = "inputData";

    satellites: Satellites;

    constructor(satellites: Satellites) {
        super(InputData.cookieKey);
        this.satellites = satellites;
    }

    pull() {
        this.pullBody();
        this.pullAntenna();

        this.satellites.count = parseInt($("input#count").val());
        this.satellites.altitude = parseFloat($("input#altitude").val());
        this.satellites.elcConsumption = parseFloat($("input#elcConsumption").val());
        this.satellites.parkingAltitude = parseFloat($("input#parkingAltitude").val());
    }

    pullBody() {
        this.satellites.body.name = $("input#body_name").val();
        this.satellites.body.color = $("input#body_color").val();
        this.satellites.body.radius = parseFloat($("input#body_radius").val());
        this.satellites.body.stdGravParam = parseFloat($("input#body_stdGravParam").val());
        this.satellites.body.soi = parseFloat($("input#body_soi").val());
    }

    pullAntenna() {
        this.satellites.antenna.name = $("input#antenna_name").val();
        if ($("select#antenna_type").val() == "omni") {
            this.satellites.antenna.type = AntennaType.omni;
        } else if ($("select#antenna_type").val() == "dish") {
            this.satellites.antenna.type = AntennaType.dish;
        }
        this.satellites.antenna.range = parseFloat($("input#antenna_range").val());
        this.satellites.antenna.elcConsumption = parseFloat($("input#antenna_elcConsumption").val());
    }

    push() {

    }

    reset() {
        $("select#body").val("Kerbin");
        $("input#count").val((4).toString());
        $("input#altitude").val((1000).toString());
        $("input#elcConsumption").val((0.01).toString());
        $("select#antenna").val("Communotron 16");
        $("input#parkingAltitude").val((70).toString());
    }

    save() {
        this.saveCookie(this.satellites);
    }

    restore() {
        this.satellites = this.loadCookie();
    }
}