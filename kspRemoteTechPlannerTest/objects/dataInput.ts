/// <reference path="../references.ts" />

class DataInput {
    'use strict';

    bodySelector: protractor.ElementFinder = element(by.xpath("//select[@ng-model='input.satChain.body.name']"));
    bodyDetailToggle: protractor.ElementFinder = element(by.xpath("//button[@ng-click='input.bodyDetailVisible = !input.bodyDetailVisible']"));

    bodyColor: protractor.ElementFinder;
    bodyRadius: protractor.ElementFinder;
    bodyStdGravity: protractor.ElementFinder;
    bodySoi: protractor.ElementFinder;

    count: protractor.ElementFinder = element(by.xpath("//input[@ng-model='input.satChain.count']"));
    altitude: protractor.ElementFinder = element(by.xpath("//input[@ng-model='input.satChain.altitude']"));
    elcNeeded: protractor.ElementFinder = element(by.xpath("//input[@ng-model='input.satChain.elcNeeded']"));

    antennaSelector: protractor.ElementArrayFinder;
    antennaShow: protractor.ElementArrayFinder;
    antennaDetailToggle: protractor.ElementArrayFinder;

    antennaAdd: protractor.ElementFinder = element(by.buttonText("Add after the last"));
    antennaRemove: protractor.ElementFinder = element(by.buttonText("Remove selected"));

    antennaType: protractor.ElementArrayFinder;
    antennaRange: protractor.ElementArrayFinder;
    antennaElcNeeded: protractor.ElementArrayFinder;

    parkingAlt: protractor.ElementFinder = element(by.xpath("//input[@ng-model='input.satChain.parkingAlt']"));

    selectBody(name: string) {
        this.bodySelector.element(by.xpath("//option[text()='" + name + "']")).click();
    }

    getBodyDetail() {
        this.bodyColor = element(by.binding("input.satChain.body.color"));
        this.bodyRadius = element(by.binding("input.satChain.body.radius"));
        this.bodyStdGravity = element(by.binding("input.satChain.body.stdGravity"));
        this.bodySoi = element(by.binding("input.satChain.body.soi"));
    }

    getAntennas() {
        this.antennaSelector = element.all(by.xpath("//select[@ng-model='antenna.name']"));
        this.antennaShow = element.all(by.xpath("//button[@ng-click='input.setAntennaIndex($index) || input.save() || app.updateView()']"));
        this.antennaDetailToggle = element.all(by.xpath("//button[@ng-click='input.antennaDetailVisible[$index] = !input.antennaDetailVisible[$index]']"));
    }

    selectAntenna(selector: protractor.ElementFinder, name: string) {
        selector.element(by.xpath(".//option[text()='" + name + "']")).click();
    }

    getAntennaDetails() {
        this.antennaType = element.all(by.binding("antenna.type"));
        this.antennaRange = element.all(by.binding("antenna.range"));
        this.antennaElcNeeded = element.all(by.binding("antenna.elcNeeded"));
    }
}
