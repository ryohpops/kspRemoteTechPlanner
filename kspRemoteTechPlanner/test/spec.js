var dataInput = function () {
    this.bodySelector = element(by.xpath("//select[@ng-model='input.satChain.body.name']"));
    this.bodyDetailToggle = element(by.xpath("//button[@data-target='#detail_body']"));

    this.bodyColor = null;
    this.bodyRadius = null;
    this.bodyStdGravity = null;
    this.bodySoi = null;

    this.count = element(by.xpath("//input[@ng-model='input.satChain.count']"));
    this.altitude = element(by.xpath("//input[@ng-model='input.satChain.altitude']"));
    this.elcNeeded = element(by.xpath("//input[@ng-model='input.satChain.elcNeeded']"));

    this.antennaSelector = element(by.xpath("//select[@ng-model='input.satChain.antenna.name']"));
    this.antennaDetailToggle = element(by.xpath("//button[@data-target='#detail_antenna']"));

    this.antennaType = null;
    this.antennaRange = null;
    this.antennaElcNeeded = null;

    this.parkingAlt = element(by.xpath("//input[@ng-model='input.satChain.parkingAlt']"));

    this.selectBody = function (name) {
        this.bodySelector.element(by.xpath("//option[text()='" + name + "']")).click();
    };

    this.openBodyDetail = function () {
        this.bodyDetailToggle.click();
        this.bodyColor = element(by.binding("input.satChain.body.color"));
        this.bodyRadius = element(by.binding("input.satChain.body.radius"));
        this.bodyStdGravity = element(by.binding("input.satChain.body.stdGravity"));
        this.bodySoi = element(by.binding("input.satChain.body.soi"));
    };

    this.selectAntenna = function (name) {
        this.antennaSelector.element(by.xpath("//option[text()='" + name + "']")).click();
    };

    this.openAntennaDetail = function () {
        this.antennaDetailToggle.click();
        this.antennaType = element(by.binding("input.satChain.antenna.typeString()"));
        this.antennaRange = element(by.binding("input.satChain.antenna.range"));
        this.antennaElcNeeded = element(by.binding("input.satChain.antenna.elcNeeded"));
    };
};

var bodyEdit = function () {

};

var antennaEdit = function () {

};

describe("KSP RemoteTech Planner", function () {
    beforeEach(function () {
        browser.get("http://localhost:8080/");
    });

    describe("Data Input", function () {
        describe("selecting body", function () {
            it("should load body's detail", function () {
                var di = new dataInput();
                di.selectBody("Moho");
                di.openBodyDetail();

                expect(di.bodyColor.getText()).toEqual("rgb(185,122,87)");
                expect(di.bodyRadius.getText()).toEqual("250 km");
                expect(di.bodyStdGravity.getText()).toEqual("168.609 km3s-2");
                expect(di.bodySoi.getText()).toEqual("9,646.663 km");
            });
        });

        describe("selecting antenna", function () {
            it("should load omni-antenna's detail", function () {
                var di = new dataInput();
                di.selectAntenna("Communotron 32")
                di.openAntennaDetail();

                expect(di.antennaType.getText()).toEqual("Omnidirectional");
                expect(di.antennaRange.getText()).toEqual("5,000 km");
                expect(di.antennaElcNeeded.getText()).toEqual("0.6 /sec.");
            });

            it("should load dish-antenna's detail", function () {
                var di = new dataInput();
                di.selectAntenna("Reflectron KR-7");
                di.openAntennaDetail();

                expect(di.antennaType.getText()).toEqual("Dish");
                expect(di.antennaRange.getText()).toEqual("90,000 km");
                expect(di.antennaElcNeeded.getText()).toEqual("0.82 /sec.");
            })
        });

        it("should remember last input", function () {
            var di = new dataInput();
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

    describe("Body Edit", function () {
        var testBody = {
            name: "Test1",
            color: "red",
            radius: 150,
            stdGravity: 1000,
            soi: 30000
        };

        var name = element(by.xpath("//input[@name='name']"));
        var color = element(by.xpath("//input[@name='color']"));
        var radius = element(by.xpath("//input[@name='radius']"));
        var stdGravity = element(by.xpath("//input[@name='stdGravity']"));
        var soi = element(by.xpath("//input[@name='soi']"));

        var saveButton = element(by.buttonText("Save"));
        var cancelButton = element(by.buttonText("Cancel"));
        var addButton = element(by.buttonText("Add new"));

        var bodySelector = element(by.xpath("//select[@ng-model='input.satChain.body.name']"));

        beforeEach(function () {
            browser.manage().deleteAllCookies();
            element(by.xpath("//a[@href='#body']")).click();
        });

        this.addTestBody = function (body) {
            addButton.click();
        };

        it("should add selection to Input Data", function () {

        });

        it("should save new body's data correctly", function () {

        });

        it("should remove selection from Input Data", function () {

        });

        it("should save body data", function () {

        });
    });

});
