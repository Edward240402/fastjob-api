"use strict";
exports.__esModule = true;
exports.Job = void 0;
var Job = /** @class */ (function () {
    function Job(id, payment) {
        this.id = id;
        this.payment = payment;
        this.actual_payment = 0;
        this.discount = 0;
    }
    Job.prototype.setSpecialPrice = function (input) {
        if (this.payment > input) {
            this.actual_payment = input;
            this.discount = 1 - this.actual_payment / this.payment;
        }
    };
    return Job;
}());
exports.Job = Job;
