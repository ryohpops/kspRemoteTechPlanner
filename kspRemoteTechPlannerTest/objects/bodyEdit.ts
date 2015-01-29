/// <reference path="../references.ts" />

class BodyEdit {
    'use strict';

    name: protractor.ElementFinder = element(by.xpath("//form[@name='bodyEditForm']//input[@name='name']"));
    color: protractor.ElementFinder = element(by.xpath("//form[@name='bodyEditForm']//input[@name='color']"));
    radius: protractor.ElementFinder = element(by.xpath("//form[@name='bodyEditForm']//input[@name='radius']"));
    stdGravity: protractor.ElementFinder = element(by.xpath("//form[@name='bodyEditForm']//input[@name='stdGravity']"));
    soi: protractor.ElementFinder = element(by.xpath("//form[@name='bodyEditForm']//input[@name='soi']"));

    saveButton: protractor.ElementFinder = element(by.xpath("//form[@name='bodyEditForm']")).element(by.buttonText("Save"));
    cancelButton: protractor.ElementFinder = element(by.xpath("//form[@name='bodyEditForm']")).element(by.buttonText("Cancel"));
    addButton: protractor.ElementFinder = element(by.xpath("//form[@name='bodyEditForm']")).element(by.buttonText("Add new"));

    addBody(body) {
        this.addButton.click();
        this.name.sendKeys(body.name);
        this.color.sendKeys(body.color);
        this.radius.sendKeys(body.radius.toString());
        this.stdGravity.sendKeys(body.stdGravity.toString());
        this.soi.sendKeys(body.soi.toString());
        this.saveButton.click();
    }
}
