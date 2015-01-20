/// <reference path="../references.ts" />

class BodyEdit {
    'use strict';

    name: protractor.ElementFinder = element(by.xpath("//input[@name='name']"));
    color: protractor.ElementFinder = element(by.xpath("//input[@name='color']"));
    radius: protractor.ElementFinder = element(by.xpath("//input[@name='radius']"));
    stdGravity: protractor.ElementFinder = element(by.xpath("//input[@name='stdGravity']"));
    soi: protractor.ElementFinder = element(by.xpath("//input[@name='soi']"));

    saveButton: protractor.ElementFinder = element(by.buttonText("Save"));
    cancelButton: protractor.ElementFinder = element(by.buttonText("Cancel"));
    addButton: protractor.ElementFinder = element(by.buttonText("Add new"));

    testBody1 = { name: "Test1", color: "red", radius: 150, stdGravity: 1000, soi: 30000 };

    addBody(body) {
        this.addButton.click();
        this.name.sendKeys(body.name);
        this.color.sendKeys(body.color);
        this.radius.sendKeys(body.radius.toString());
        this.stdGravity.sendKeys(body.stdGravity.toString());
        this.soi.sendKeys(body.soi.toString());
    }
}
