"use strict";
exports.__esModule = true;
exports.AppNotification = void 0;
var app_error_1 = require("./app.error");
var AppNotification = /** @class */ (function () {
    function AppNotification() {
        this.errors = [];
    }
    AppNotification.prototype.addError = function (message, cause) {
        this.errors.push(new app_error_1.AppError(message, cause));
    };
    AppNotification.prototype.hasErrors = function () {
        return this.errors.length > 0;
    };
    AppNotification.prototype.getErrors = function () {
        return this.errors;
    };
    return AppNotification;
}());
exports.AppNotification = AppNotification;
