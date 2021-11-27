"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EmployeeTypeORM = void 0;
var typeorm_1 = require("typeorm");
var years_of_experience_typeorm_1 = require("./years.of.experience.typeorm");
var availabilityTypeORM_1 = require("./availabilityTypeORM");
var name_typeorm_1 = require("./name.typeorm");
var email_typeorm_1 = require("./email.typeorm");
var password_typeorm_1 = require("./password.typeorm");
var age_typeorm_1 = require("./age.typeorm");
var rate_typeorm_1 = require("./rate.typeorm");
var number_of_rates_typeorm_1 = require("./number.of.rates.typeorm");
var employee_id_typeorm_1 = require("./employee.id.typeorm");
var typeOfAccount_typeorm_1 = require("./typeOfAccount.typeorm");
var EmployeeTypeORM = /** @class */ (function () {
    function EmployeeTypeORM() {
    }
    __decorate([
        (0, typeorm_1.Column)(function (type) { return employee_id_typeorm_1.EmployeeIdTypeORM; }, { prefix: false })
    ], EmployeeTypeORM.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return name_typeorm_1.NameTypeORM; }, { prefix: false })
    ], EmployeeTypeORM.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return email_typeorm_1.EmailTypeORM; }, { prefix: false })
    ], EmployeeTypeORM.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return password_typeorm_1.PasswordTypeORM; }, { prefix: false })
    ], EmployeeTypeORM.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return age_typeorm_1.AgeTypeORM; }, { prefix: false })
    ], EmployeeTypeORM.prototype, "age");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return rate_typeorm_1.RateTypeORM; }, { prefix: false })
    ], EmployeeTypeORM.prototype, "rate");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return number_of_rates_typeorm_1.NumberOfRatesTypeORM; }, { prefix: false })
    ], EmployeeTypeORM.prototype, "numberOfRates");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return years_of_experience_typeorm_1.YearsOfExperienceTypeORM; }, { prefix: false })
    ], EmployeeTypeORM.prototype, "yearsOfExperience");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return availabilityTypeORM_1.AvailabilityTypeORM; }, { prefix: false })
    ], EmployeeTypeORM.prototype, "availability");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return typeOfAccount_typeorm_1.TypeOfAccountTypeORM; }, { prefix: false })
    ], EmployeeTypeORM.prototype, "typeOfAccount");
    EmployeeTypeORM = __decorate([
        (0, typeorm_1.Entity)('employees'),
        (0, typeorm_1.Unique)('UQ_employees_employee_id', ['id.value'])
    ], EmployeeTypeORM);
    return EmployeeTypeORM;
}());
exports.EmployeeTypeORM = EmployeeTypeORM;
