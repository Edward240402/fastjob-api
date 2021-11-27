"use strict";
exports.__esModule = true;
exports.AppError = void 0;
var AppError = /** @class */ (function () {
    function AppError(message, cause) {
        this.message = message;
        this.cause = cause;
    }
    return AppError;
}());
exports.AppError = AppError;
