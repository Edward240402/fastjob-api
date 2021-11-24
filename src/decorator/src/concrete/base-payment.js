"use strict";
exports.__esModule = true;
exports.BasePayment = void 0;
var BasePayment = /** @class */ (function () {
    function BasePayment() {
    }
    BasePayment.prototype.calculate = function (input) {
        console.log(this.constructor.name + " discount applied.");
        return input;
    };
    return BasePayment;
}());
exports.BasePayment = BasePayment;
