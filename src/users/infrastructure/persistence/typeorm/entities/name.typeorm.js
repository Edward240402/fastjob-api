"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NameTypeORM = void 0;
var typeorm_1 = require("typeorm");
var NameTypeORM = /** @class */ (function () {
    function NameTypeORM(name) {
        this.name = name;
    }
    NameTypeORM.from = function (name) {
        return new NameTypeORM(name);
    };
    __decorate([
        (0, typeorm_1.Column)('varchar', { name: 'name', length: 50, nullable: false })
    ], NameTypeORM.prototype, "name");
    return NameTypeORM;
}());
exports.NameTypeORM = NameTypeORM;