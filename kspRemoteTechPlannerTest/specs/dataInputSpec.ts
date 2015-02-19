/// <reference path="../references.ts" />

describe("Data Input",() => {
    beforeEach(() => {
        browser.manage().window().maximize();
        browser.get("http://localhost:8080/");
    });

    describe("selecting a body",() => {
        it("should load detail of the user's body",() => {
            var testBody: any = { name: "Test1", color: "red", radius: 150, stdGravity: 1000, soi: 30000 };

            Index.navBodyEdit.click();

            var be: BodyEdit = new BodyEdit();
            be.addBody(testBody);

            Index.navPlanner.click();

            var di: DataInput = new DataInput();
            di.selectBody(testBody.name);

            di.bodyDetailToggle.click();
            di.getBodyDetail();

            expect(di.bodyColor.getText()).toEqual("red");
            expect(di.bodyRadius.getText()).toEqual("150 km");
            expect(di.bodyStdGravity.getText()).toEqual("1,000 km3s-2");
            expect(di.bodySoi.getText()).toEqual("30,000 km");
        });
    });

    describe("selecting antenna",() => {
        it("should load user dish-antenna's detail at first spot",() => {
            var testDish: any = { name: "Dish1", antennaType: "1", range: 12000, elcNeeded: 1.25 };

            Index.navAntennaEdit.click();

            var ae: AntennaEdit = new AntennaEdit();
            ae.addAntenna(testDish);

            Index.navPlanner.click();

            var di: DataInput = new DataInput();
            di.getAntennas();
            di.selectAntenna(di.antennaSelector.get(0), testDish.name);

            di.antennaDetailToggle.get(0).click();
            di.getAntennaDetails();

            expect(di.antennaType.get(0).getText()).toEqual("Dish");
            expect(di.antennaRange.get(0).getText()).toEqual("12,000 km");
            expect(di.antennaElcNeeded.get(0).getText()).toEqual("1.25 /sec.");
        });

        it("should load user dish-antenna's detail at third spot",() => {
            var testDish: any = { name: "Dish2", antennaType: "1", range: 15000, elcNeeded: 2.25 };

            Index.navAntennaEdit.click();

            var ae: AntennaEdit = new AntennaEdit();
            ae.addAntenna(testDish);

            Index.navPlanner.click();

            var di: DataInput = new DataInput();
            di.antennaAdd.click();
            di.antennaAdd.click();
            di.getAntennas();
            di.selectAntenna(di.antennaSelector.get(2), testDish.name);

            di.antennaDetailToggle.get(2).click();
            di.getAntennaDetails();

            expect(di.antennaType.get(2).getText()).toEqual("Dish");
            expect(di.antennaRange.get(2).getText()).toEqual("15,000 km");
            expect(di.antennaElcNeeded.get(2).getText()).toEqual("2.25 /sec.");
        });
    });

    it("should remember last input",() => {
        var di: DataInput = new DataInput();
        di.selectBody("Eve");
        di.count.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"), "6");
        di.altitude.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"), "500");
        di.elcNeeded.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"), "0.88");
        di.antennaAdd.click();
        di.getAntennas();
        di.selectAntenna(di.antennaSelector.get(0), "CommTech EXP-VR-2T");
        di.selectAntenna(di.antennaSelector.get(1), "Reflectron KR-14");
        di.antennaShow.get(1).click();
        di.parkingAlt.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"), "100");
        browser.waitForAngular();

        browser.refresh();

        expect(di.bodySelector.getAttribute("value")).toEqual("Eve");
        expect(di.count.getAttribute("value")).toEqual("6");
        expect(di.altitude.getAttribute("value")).toEqual("500");
        expect(di.elcNeeded.getAttribute("value")).toEqual("0.88");
        expect(di.antennaSelector.get(0).getAttribute("value")).toEqual("CommTech EXP-VR-2T");
        expect(di.antennaSelector.get(1).getAttribute("value")).toEqual("Reflectron KR-14");
        expect(di.antennaShow.get(1).getAttribute("class")).toContain("btn-success");
        expect(di.parkingAlt.getAttribute("value")).toEqual("100");
    });
});
