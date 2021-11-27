"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TransactionTypeorm = void 0;
var typeorm_1 = require("typeorm");
var transaction_id_typeorm_1 = require("./transaction.id.typeorm");
var payment_typeorm_1 = require("./payment.typeorm");
var employee_id_typeorm_1 = require("../../../../../common/infrastructure/persistence/typeorm/entities/employee-id.typeorm");
var contractor_id_typeorm_1 = require("../../../../../common/infrastructure/persistence/typeorm/entities/contractor-id.typeorm");
var contract_id_typeorm_1 = require("../../../../../common/infrastructure/persistence/typeorm/entities/contract-id.typeorm");
var typeOfAccount_typeorm_1 = require("../../../../../users/infrastructure/persistence/typeorm/entities/typeOfAccount.typeorm");
var discount_typeorm_1 = require("./discount.typeorm");
var total_typeorm_1 = require("./total.typeorm");
var TransactionTypeorm = /** @class */ (function () {
    function TransactionTypeorm() {
    }
    __decorate([
        (0, typeorm_1.Column)(function (type) { return transaction_id_typeorm_1.TransactionIdTypeorm; }, { prefix: false })
    ], TransactionTypeorm.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return contract_id_typeorm_1.ContractIdTypeorm; }, { prefix: false })
    ], TransactionTypeorm.prototype, "contract_id");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return employee_id_typeorm_1.EmployeeIdTypeorm; }, { prefix: false })
    ], TransactionTypeorm.prototype, "employee_id");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return contractor_id_typeorm_1.ContractorIdTypeorm; }, { prefix: false })
    ], TransactionTypeorm.prototype, "contractor_id");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return payment_typeorm_1.PaymentTypeORM; }, { prefix: false })
    ], TransactionTypeorm.prototype, "payment");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return typeOfAccount_typeorm_1.TypeOfAccountTypeORM; }, { prefix: false })
    ], TransactionTypeorm.prototype, "type_of_account");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return discount_typeorm_1.DiscountTypeORM; }, { prefix: false })
    ], TransactionTypeorm.prototype, "discount");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return total_typeorm_1.TotalTypeORM; }, { prefix: false })
    ], TransactionTypeorm.prototype, "total");
    TransactionTypeorm = __decorate([
        (0, typeorm_1.Entity)('transactions'),
        (0, typeorm_1.Unique)('UQ_transactions_id', ['id.value'])
    ], TransactionTypeorm);
    return TransactionTypeorm;
}());
exports.TransactionTypeorm = TransactionTypeorm;
