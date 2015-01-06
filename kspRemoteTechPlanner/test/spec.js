describe("index.html", function () {
    it("should show correct title", function () {
        browser.get("http://localhost:63269/index.html");

        expect(browser.getTitle()).toEqual("Visual RemoteTech Planner for KSP");
    });
});
