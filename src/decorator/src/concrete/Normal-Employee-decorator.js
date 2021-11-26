"use strict";
exports.__esModule = true;
exports.NormalEmployeeDecorator = void 0;
var NormalEmployeeDecorator = /** @class */ (function () {
    function NormalEmployeeDecorator(decorator) {
        this.decorator = decorator;
        this.discountAmount = 0.1;
    }
    NormalEmployeeDecorator.prototype.calculate = function (input) {
        console.log(this.constructor.name + "  no approved to reduce interest cost.");
        input = (input * (1 - this.discountAmount));
        return this.decorator.calculate(input);
    };
    return NormalEmployeeDecorator;
}());
exports.NormalEmployeeDecorator = NormalEmployeeDecorator;
