"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContractTypeORM = void 0;
var typeorm_1 = require("typeorm");
var contract_id_typeorm_1 = require("./contract.id.typeorm");
var contractDate_typeorm_1 = require("./contractDate.typeorm");
var agreedDateTypeORM_1 = require("./agreedDateTypeORM");
var job_typeorm_1 = require("../../../../../common/infrastructure/persistence/typeorm/entities/job.typeorm");
var state_typeorm_1 = require("./state.typeorm");
var employee_id_typeorm_1 = require("../../../../../common/infrastructure/persistence/typeorm/entities/employee-id.typeorm");
var contractor_id_typeorm_1 = require("../../../../../common/infrastructure/persistence/typeorm/entities/contractor-id.typeorm");
var ContractTypeORM = /** @class */ (function () {
    function ContractTypeORM() {
    }
    __decorate([
        (0, typeorm_1.Column)(function (type) { return contract_id_typeorm_1.ContractIdTypeORM; }, { prefix: false })
    ], ContractTypeORM.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return employee_id_typeorm_1.EmployeeIdTypeorm; }, { prefix: false })
    ], ContractTypeORM.prototype, "employee_id");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return contractor_id_typeorm_1.ContractorIdTypeorm; }, { prefix: false })
    ], ContractTypeORM.prototype, "contractor_id");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return contractDate_typeorm_1.ContractDateTypeORM; }, { prefix: false })
    ], ContractTypeORM.prototype, "contract_date");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return agreedDateTypeORM_1.AgreedDateTypeORM; }, { prefix: false })
    ], ContractTypeORM.prototype, "agreed_date");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return job_typeorm_1.JobTypeORM; }, { prefix: false })
    ], ContractTypeORM.prototype, "job_type");
    __decorate([
        (0, typeorm_1.Column)(function (type) { return state_typeorm_1.StateTypeORM; }, { prefix: false })
    ], ContractTypeORM.prototype, "state");
    ContractTypeORM = __decorate([
        (0, typeorm_1.Entity)('contracts'),
        (0, typeorm_1.Unique)('UQ_contracts_id', ['id.value'])
    ], ContractTypeORM);
    return ContractTypeORM;
}());
exports.ContractTypeORM = ContractTypeORM;
