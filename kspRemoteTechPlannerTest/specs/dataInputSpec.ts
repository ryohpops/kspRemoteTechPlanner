/// <reference path="../references.ts" />

describe("Data Input",() => {
    beforeEach(() => {
        browser.get("http://localhost:8080/");
    });

    describe("selecting a body",() => {
        it("should load detail of the stock body",() => {
            var moho = { name: "Moho", color: "rgb(185,122,87)", radius: 250, stdGravity: 168.60938, soi: 9646.663 };

            var di = new DataInput();
            di.selectBody(moho.name);
            di.openBodyDetail();

            expect(di.bodyColor.getText()).toEqual("rgb(185,122,87)");
            expect(di.bodyRadius.getText()).toEqual("250 km");
            expect(di.bodyStdGravity.getText()).toEqual("168.609 km3s-2");
            expect(di.bodySoi.getText()).toEqual("9,646.663 km");
        });

        it("should load detail of the user's body",() => {
            var testBody = { name: "Test1", color: "red", radius: 150, stdGravity: 1000, soi: 30000 };

            var idx = new Index();
            Index.navBodyEdit.click();

            var be = new BodyEdit();
            be.addBody(testBody);

            var di = new DataInput();
            di.selectBody(testBody.name);
            di.openBodyDetail();

            expect(di.bodyColor.getText()).toEqual("red");
            expect(di.bodyRadius.getText()).toEqual("150 km");
            expect(di.bodyStdGravity.getText()).toEqual("1,000 km3s-2");
            expect(di.bodySoi.getText()).toEqual("30,000 km");
        });
    });

    describe("selecting antenna",() => {
        it("should load omni-antenna's detail",() => {
            var di = new DataInput();
            di.selectAntenna("Communotron 32")
            di.openAntennaDetail();

            expect(di.antennaType.getText()).toEqual("Omnidirectional");
            expect(di.antennaRange.getText()).toEqual("5,000 km");
            expect(di.antennaElcNeeded.getText()).toEqual("0.6 /sec.");
        });

        it("should load dish-antenna's detail",() => {
            var di = new DataInput();
            di.selectAntenna("Reflectron KR-7");
            di.openAntennaDetail();

            expect(di.antennaType.getText()).toEqual("Dish");
            expect(di.antennaRange.getText()).toEqual("90,000 km");
            expect(di.antennaElcNeeded.getText()).toEqual("0.82 /sec.");
        })
    });

    it("should remember last input",() => {
        var di = new DataInput();
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
