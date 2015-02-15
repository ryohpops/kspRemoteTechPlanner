/// <reference path="../references.ts" />

describe("Data Input",() => {
    beforeEach(() => {
        browser.manage().window().maximize();
        browser.get("http://localhost:8080/");
    });

    describe("selecting a body",() => {
        it("should load detail of the stock body",() => {
            var di: DataInput = new DataInput();
            di.selectBody("Moho");
            di.openBodyDetail();

            expect(di.bodyColor.getText()).toEqual("rgb(185,122,87)");
            expect(di.bodyRadius.getText()).toEqual("250 km");
            expect(di.bodyStdGravity.getText()).toEqual("168.609 km3s-2");
            expect(di.bodySoi.getText()).toEqual("9,646.663 km");
        });

        it("should load detail of the user's body",() => {
            var testBody: any = { name: "Test1", color: "red", radius: 150, stdGravity: 1000, soi: 30000 };

            Index.navBodyEdit.click();

            var be: BodyEdit = new BodyEdit();
            be.addBody(testBody);

            Index.navPlanner.click();

            var di: DataInput = new DataInput();
            di.selectBody(testBody.name);
            di.openBodyDetail();

            expect(di.bodyColor.getText()).toEqual("red");
            expect(di.bodyRadius.getText()).toEqual("150 km");
            expect(di.bodyStdGravity.getText()).toEqual("1,000 km3s-2");
            expect(di.bodySoi.getText()).toEqual("30,000 km");
        });
    });

    describe("selecting antenna",() => {
        it("should load stock omni-antenna's detail",() => {
            var di: DataInput = new DataInput();
            di.selectAntenna("Communotron 32")
            di.openAntennaDetail();

            expect(di.antennaType.getText()).toEqual("Omnidirectional");
            expect(di.antennaRange.getText()).toEqual("5,000 km");
            expect(di.antennaElcNeeded.getText()).toEqual("0.6 /sec.");
        });

        it("should load stock dish-antenna's detail",() => {
            var di: DataInput = new DataInput();
            di.selectAntenna("Reflectron KR-7");
            di.openAntennaDetail();

            expect(di.antennaType.getText()).toEqual("Dish");
            expect(di.antennaRange.getText()).toEqual("90,000 km");
            expect(di.antennaElcNeeded.getText()).toEqual("0.82 /sec.");
        });

        it("should load user omni-antenna's detail",() => {
            var testOmni: any = { name: "Omni1", antennaType: "0", range: 6000, elcNeeded: 0.99 };

            Index.navAntennaEdit.click();

            var ae: AntennaEdit = new AntennaEdit();
            ae.addAntenna(testOmni);

            Index.navPlanner.click();

            var di: DataInput = new DataInput();
            di.selectAntenna(testOmni.name)
            di.openAntennaDetail();

            expect(di.antennaType.getText()).toEqual("Omnidirectional");
            expect(di.antennaRange.getText()).toEqual("6,000 km");
            expect(di.antennaElcNeeded.getText()).toEqual("0.99 /sec.");
        });

        it("should load user dish-antenna's detail",() => {
            var testDish: any = { name: "Dish1", antennaType: "1", range: 12000, elcNeeded: 1.25 };

            Index.navAntennaEdit.click();

            var ae: AntennaEdit = new AntennaEdit();
            ae.addAntenna(testDish);

            Index.navPlanner.click();

            var di: DataInput = new DataInput();
            di.selectAntenna(testDish.name);
            di.openAntennaDetail();

            expect(di.antennaType.getText()).toEqual("Dish");
            expect(di.antennaRange.getText()).toEqual("12,000 km");
            expect(di.antennaElcNeeded.getText()).toEqual("1.25 /sec.");
        });
    });

    it("should remember last input",() => {
        var di: DataInput = new DataInput();
        di.selectBody("Eve");
        di.count.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"), "6");
        di.altitude.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"), "500");
        di.elcNeeded.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"), "0.88");
        di.selectAntenna("CommTech EXP-VR-2T");
        di.parkingAlt.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"), "100");
        browser.waitForAngular();

        browser.refresh();

        expect(di.bodySelector.getAttribute("value")).toEqual("Eve");
        expect(di.count.getAttribute("value")).toEqual("6");
        expect(di.altitude.getAttribute("value")).toEqual("500");
        expect(di.elcNeeded.getAttribute("value")).toEqual("0.88");
        expect(di.antennaSelector.getAttribute("value")).toEqual("CommTech EXP-VR-2T");
        expect(di.parkingAlt.getAttribute("value")).toEqual("100");
    });
});
