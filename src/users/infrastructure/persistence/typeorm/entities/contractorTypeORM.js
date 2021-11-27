"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContractorTypeORM = void 0;
var typeorm_1 = require("typeorm");
var name_typeorm_1 = require("./name.typeorm");
var email_typeorm_1 = require("./email.typeorm");
var password_typeorm_1 = require("./password.typeorm");
var age_typeorm_1 = require("./age.typeorm");
var rate_typeorm_1 = require("./rate.typeorm");
var number_of_rates_typeorm_1 = require("./number.of.rates.typeorm");
var contractor_id_typeorm_1 = require("./contractor.id.typeorm");
var ContractorTypeORM = /** @class */ (function () {
    function ContractorTypeORM() {
    }
    __decorate([
        (0, typeorm_1.Column)(function (type) { return contractor_id_typeorm_1.ContractorIdTypeORM; }, { prefix: false })
    ], ContractorTypeORM.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return name_typeorm_1.NameTypeORM; }, { prefix: false })
    ], ContractorTypeORM.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return email_typeorm_1.EmailTypeORM; }, { prefix: false })
    ], ContractorTypeORM.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return password_typeorm_1.PasswordTypeORM; }, { prefix: false })
    ], ContractorTypeORM.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return age_typeorm_1.AgeTypeORM; }, { prefix: false })
    ], ContractorTypeORM.prototype, "age");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return rate_typeorm_1.RateTypeORM; }, { prefix: false })
    ], ContractorTypeORM.prototype, "rate");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return number_of_rates_typeorm_1.NumberOfRatesTypeORM; }, { prefix: false })
    ], ContractorTypeORM.prototype, "numberOfRates");
    ContractorTypeORM = __decorate([
        (0, typeorm_1.Entity)('contractors'),
        (0, typeorm_1.Unique)('UQ_contractors_contractor_id', ['id.value'])
    ], ContractorTypeORM);
    return ContractorTypeORM;
}());
exports.ContractorTypeORM = ContractorTypeORM;
