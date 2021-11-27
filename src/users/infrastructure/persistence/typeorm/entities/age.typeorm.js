"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AgeTypeORM = void 0;
var typeorm_1 = require("typeorm");
var AgeTypeORM = /** @class */ (function () {
    function AgeTypeORM(age) {
        this.age = age;
    }
    AgeTypeORM.from = function (age) {
        return new AgeTypeORM(age);
    };
    __decorate([
        (0, typeorm_1.Column)('int', { name: 'age', nullable: false, unsigned: true })
    ], AgeTypeORM.prototype, "age");
    return AgeTypeORM;
}());
exports.AgeTypeORM = AgeTypeORM;
