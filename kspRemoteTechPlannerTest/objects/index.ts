/// <reference path="../_references.ts" />

class Index {
    'use strict';

    static navPlanner: protractor.ElementFinder = element(by.xpath("//a[@href='#planner']"));
    static navBodyEdit: protractor.ElementFinder = element(by.xpath("//a[@href='#body']"));
    static navAntennaEdit: protractor.ElementFinder = element(by.xpath("//a[@href='#antenna']"));
}
