/// <reference path="../references.ts" />

class AntennaEdit {
    'use strict';

    form: protractor.ElementFinder = element(by.xpath("//form[@name='antennaEditForm']"));
    name: protractor.ElementFinder = this.form.element(by.xpath(".//input[@name='name']"));
    typeOmni: protractor.ElementFinder = this.form.element(by.xpath(".//select[@ng-model='antennaEdit.editData.type']/option[@value='0']"));
    typeDish: protractor.ElementFinder = this.form.element(by.xpath(".//select[@ng-model='antennaEdit.editData.type']/option[@value='1']"));
    range: protractor.ElementFinder = this.form.element(by.xpath(".//input[@name='range']"));
    elcNeeded: protractor.ElementFinder = this.form.element(by.xpath(".//input[@name='elcNeeded']"));

    saveButton: protractor.ElementFinder = this.form.element(by.buttonText("Save"));
    cancelButton: protractor.ElementFinder = this.form.element(by.buttonText("Cancel"));
    addButton: protractor.ElementFinder = this.form.element(by.buttonText("Add new"));

    addAntenna(antenna) {
        this.addButton.click();
        this.name.sendKeys(antenna.name);
        if (antenna.antennaType == 0)
            this.typeOmni.click();
        else
            this.typeDish.click();
        this.range.sendKeys(antenna.range);
        this.elcNeeded.sendKeys(antenna.elcNeeded);
        this.saveButton.click();
    }
}
