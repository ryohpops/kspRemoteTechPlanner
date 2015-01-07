describe("Data Input", function () {
    beforeEach(function () {
        browser.get("http://localhost:63269/");
    });

    describe("selecting body", function () {
        var bodySelector = element(by.xpath("//select[@ng-model='input.satChain.body.name']"));
        var bodyDetailToggle = element(by.xpath("//button[@data-target='#detail_body']"));

        it("should load body's detail", function () {
            bodySelector.element(by.xpath("//option[text()='Moho']")).click();
            bodyDetailToggle.click();

            expect(element(by.binding("input.satChain.body.color")).getText()).toEqual("rgb(185,122,87)");
            expect(element(by.binding("input.satChain.body.radius")).getText()).toEqual("250 km");
            expect(element(by.binding("input.satChain.body.stdGravity")).getText()).toEqual("168.609 km3s-2");
            expect(element(by.binding("input.satChain.body.soi")).getText()).toEqual("9,646.663 km");
        });
    });

    describe("selecting antenna", function () {
        var antennaSelector = element(by.xpath("//select[@ng-model='input.satChain.antenna.name']"));
        var antennaDetailToggle = element(by.xpath("//button[@data-target='#detail_antenna']"));

        it("should load omni-antenna's detail", function () {
            antennaSelector.element(by.xpath("//option[text()='Communotron 32']")).click();
            antennaDetailToggle.click();

            expect(element(by.binding("input.satChain.antenna.typeString()")).getText()).toEqual("Omnidirectional");
            expect(element(by.binding("input.satChain.antenna.range")).getText()).toEqual("5,000 km");
            expect(element(by.binding("input.satChain.antenna.elcNeeded")).getText()).toEqual("0.6 /sec.");
        });

        it("should load dish-antenna's detail", function () {
            antennaSelector.element(by.xpath("//option[text()='Reflectron KR-7']")).click();
            antennaDetailToggle.click();

            expect(element(by.binding("input.satChain.antenna.typeString()")).getText()).toEqual("Dish");
            expect(element(by.binding("input.satChain.antenna.range")).getText()).toEqual("90,000 km");
            expect(element(by.binding("input.satChain.antenna.elcNeeded")).getText()).toEqual("0.82 /sec.");
        })
    });
});
