/// <reference path="../references.ts" />

class BodyEdit {
    'use strict';

    form: protractor.ElementFinder = element(by.xpath("//form[@name='bodyEditForm']"));
    name: protractor.ElementFinder = this.form.element(by.xpath(".//input[@name='name']"));
    color: protractor.ElementFinder = this.form.element(by.xpath(".//input[@name='color']"));
    radius: protractor.ElementFinder = this.form.element(by.xpath(".//input[@name='radius']"));
    stdGravity: protractor.ElementFinder = this.form.element(by.xpath(".//input[@name='stdGravity']"));
    soi: protractor.ElementFinder = this.form.element(by.xpath(".//input[@name='soi']"));

    saveButton: protractor.ElementFinder = this.form.element(by.buttonText("Save"));
    cancelButton: protractor.ElementFinder = this.form.element(by.buttonText("Cancel"));
    addButton: protractor.ElementFinder = this.form.element(by.buttonText("Add new"));

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
