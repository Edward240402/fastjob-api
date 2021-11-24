"use strict";
exports.__esModule = true;
exports.SpecialPriceDecorator = void 0;
var SpecialPriceDecorator = /** @class */ (function () {
    function SpecialPriceDecorator(decorator) {
        this.decorator = decorator;
        this.discountAmount = 0.05;
    }
    SpecialPriceDecorator.prototype.calculate = function (input) {
        console.log(this.constructor.name + " discount applied.");
        input = (input * (1 + this.discountAmount));
        return this.decorator.calculate(input);
    };
    return SpecialPriceDecorator;
}());
exports.SpecialPriceDecorator = SpecialPriceDecorator;
