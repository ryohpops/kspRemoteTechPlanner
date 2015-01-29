/// <reference path="../references.ts" />

class Index {
    'use strict';

    static navBodyEdit: protractor.ElementFinder = element(by.xpath("//a[@href='#body']"));
    static navAntennaEdit: protractor.ElementFinder = element(by.xpath("//a[@href='#antenna']"));
}
