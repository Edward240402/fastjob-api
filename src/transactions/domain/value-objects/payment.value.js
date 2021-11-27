"use strict";
exports.__esModule = true;
exports.Payment = void 0;
var typescript_result_1 = require("typescript-result");
var app_notification_1 = require("../../../common/application/app.notification");
var Payment = /** @class */ (function () {
    function Payment(payment) {
        this.payment = payment;
    }
    Payment.prototype.getPayment = function () {
        return this.payment;
    };
    Payment.create = function (payment) {
        var notification = new app_notification_1.AppNotification();
        if (payment === 0) {
            notification.addError('Invalid amount, please enter a valid number ', null);
        }
        return typescript_result_1.Result.ok(new Payment(payment));
    };
    return Payment;
}());
exports.Payment = Payment;
