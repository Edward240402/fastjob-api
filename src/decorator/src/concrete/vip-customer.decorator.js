"use strict";
exports.__esModule = true;
exports.VipEmployeeDecorator = void 0;
var VipEmployeeDecorator = /** @class */ (function () {
    function VipEmployeeDecorator(decorator) {
        this.decorator = decorator;
        this.discountAmount = 0.05;
    }
    VipEmployeeDecorator.prototype.calculate = function (input) {
        console.log(this.constructor.name + " discount applied.");
        input = (input * (1 - this.discountAmount));
        return this.decorator.calculate(input);
    };
    return VipEmployeeDecorator;
}());
exports.VipEmployeeDecorator = VipEmployeeDecorator;
