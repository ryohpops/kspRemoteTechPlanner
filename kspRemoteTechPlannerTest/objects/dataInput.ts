/// <reference path="../references.ts" />

class DataInput {
    'use strict';

    bodySelector: protractor.ElementFinder = element(by.xpath("//select[@ng-model='input.satChain.body.name']"));
    bodyDetailToggle: protractor.ElementFinder = element(by.xpath("//button[@data-target='#detail_body']"));

    bodyColor: protractor.ElementFinder;
    bodyRadius: protractor.ElementFinder;
    bodyStdGravity: protractor.ElementFinder;
    bodySoi: protractor.ElementFinder;

    count: protractor.ElementFinder = element(by.xpath("//input[@ng-model='input.satChain.count']"));
    altitude: protractor.ElementFinder = element(by.xpath("//input[@ng-model='input.satChain.altitude']"));
    elcNeeded: protractor.ElementFinder = element(by.xpath("//input[@ng-model='input.satChain.elcNeeded']"));

    antennaSelector: protractor.ElementFinder = element(by.xpath("//select[@ng-model='input.satChain.antenna.name']"));
    antennaDetailToggle: protractor.ElementFinder = element(by.xpath("//button[@data-target='#detail_antenna']"));

    antennaType: protractor.ElementFinder;
    antennaRange: protractor.ElementFinder;
    antennaElcNeeded: protractor.ElementFinder;

    parkingAlt: protractor.ElementFinder = element(by.xpath("//input[@ng-model='input.satChain.parkingAlt']"));

    selectBody(name: string) {
        this.bodySelector.element(by.xpath("//option[text()='" + name + "']")).click();
    }

    openBodyDetail() {
        this.bodyDetailToggle.click();
        this.bodyColor = element(by.binding("input.satChain.body.color"));
        this.bodyRadius = element(by.binding("input.satChain.body.radius"));
        this.bodyStdGravity = element(by.binding("input.satChain.body.stdGravity"));
        this.bodySoi = element(by.binding("input.satChain.body.soi"));
    }

    selectAntenna(name: string) {
        this.antennaSelector.element(by.xpath("//option[text()='" + name + "']")).click();
    }

    openAntennaDetail() {
        this.antennaDetailToggle.click();
        this.antennaType = element(by.binding("input.satChain.antenna.typeString()"));
        this.antennaRange = element(by.binding("input.satChain.antenna.range"));
        this.antennaElcNeeded = element(by.binding("input.satChain.antenna.elcNeeded"));
    }
}
