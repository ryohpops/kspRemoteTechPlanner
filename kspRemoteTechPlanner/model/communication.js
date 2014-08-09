/// <reference path="body.ts" />
/// <reference path="calculator.ts" />
var Communication = (function () {
    function Communication() {
    }
    Communication.prototype.isNextSatConnectable = function () {
        return Calculator.distanceBetweenPointAndLine(new Point(this.innerSize / 2, this.innerSize / 2), this.satPosition(0), this.satPosition(1)) >= this.parent.radius ? true : false;
    };
    return Communication;
})();
//# sourceMappingURL=communication.js.map
