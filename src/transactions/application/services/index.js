"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Index = void 0;
var common_1 = require("@nestjs/common");
var register_transaction_command_1 = require("../commands/register-transaction.command");
var register_transaction_response_dto_1 = require("../dtos/response/register-transaction-response.dto");
var typescript_result_1 = require("typescript-result");
var paypal_1 = require("./abstract/paypal");
var notificationApp_1 = require("./abstract/notificationApp");
var Index = /** @class */ (function () {
    function Index(commandBus, registerTransactionValidator) {
        this.commandBus = commandBus;
        this.registerTransactionValidator = registerTransactionValidator;
    }
    Index.prototype.register = function (registerTransactionRequestDto) {
        return __awaiter(this, void 0, void 0, function () {
            function clientCode() {
                var paypal = new paypal_1.Paypal();
                paypal.sentPayment(registerTransactionRequestDto.payment);
                var notification = new notificationApp_1.NotificationTransaction();
                notification.sentMessageApp(registerTransactionRequestDto.payment);
                notification.sentMessageEmail(registerTransactionRequestDto.payment);
                notification.sentMessageSMS(registerTransactionRequestDto.payment);
            }
            var notification, registerTransactionCommand, transactionId, registerTransactionResponseDto, paypal, notification_1, registerTransactionCommand, transactionId, registerTransactionResponseDto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.registerTransactionValidator.validate(registerTransactionRequestDto)];
                    case 1:
                        notification = _a.sent();
                        if (notification.hasErrors()) {
                            return [2 /*return*/, typescript_result_1.Result.error(notification)];
                        }
                        if (!(registerTransactionRequestDto.typeOfAccount === "VIP")) return [3 /*break*/, 3];
                        clientCode();
                        registerTransactionCommand = new register_transaction_command_1.RegisterTransactionsCommand(registerTransactionRequestDto.contractId, registerTransactionRequestDto.employeeId, registerTransactionRequestDto.contractorId, registerTransactionRequestDto.payment, registerTransactionRequestDto.typeOfAccount, 0.0, registerTransactionRequestDto.payment);
                        return [4 /*yield*/, this.commandBus.execute(registerTransactionCommand)];
                    case 2:
                        transactionId = _a.sent();
                        registerTransactionResponseDto = new register_transaction_response_dto_1.RegisterTransactionResponseDto(transactionId, registerTransactionRequestDto.contractId, registerTransactionRequestDto.employeeId, registerTransactionRequestDto.contractorId, registerTransactionRequestDto.payment, registerTransactionRequestDto.typeOfAccount, 0, registerTransactionRequestDto.payment);
                        return [2 /*return*/, typescript_result_1.Result.ok(registerTransactionResponseDto)];
                    case 3:
                        if (!(registerTransactionRequestDto.typeOfAccount === "NORMAL")) return [3 /*break*/, 5];
                        paypal = new paypal_1.Paypal();
                        paypal.sentPayment(registerTransactionRequestDto.payment);
                        notification_1 = new notificationApp_1.NotificationTransaction();
                        notification_1.sentMessageApp(registerTransactionRequestDto.payment);
                        notification_1.sentMessageEmail(registerTransactionRequestDto.payment);
                        notification_1.sentMessageSMS(registerTransactionRequestDto.payment);
                        registerTransactionCommand = new register_transaction_command_1.RegisterTransactionsCommand(registerTransactionRequestDto.contractId, registerTransactionRequestDto.employeeId, registerTransactionRequestDto.contractorId, registerTransactionRequestDto.payment, registerTransactionRequestDto.typeOfAccount, 0.9, registerTransactionRequestDto.payment * 0.9);
                        return [4 /*yield*/, this.commandBus.execute(registerTransactionCommand)];
                    case 4:
                        transactionId = _a.sent();
                        registerTransactionResponseDto = new register_transaction_response_dto_1.RegisterTransactionResponseDto(transactionId, registerTransactionRequestDto.contractId, registerTransactionRequestDto.employeeId, registerTransactionRequestDto.contractorId, registerTransactionRequestDto.payment, registerTransactionRequestDto.typeOfAccount, 0.9, registerTransactionRequestDto.payment * 0.9);
                        return [2 /*return*/, typescript_result_1.Result.ok(registerTransactionResponseDto)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Index = __decorate([
        (0, common_1.Injectable)()
    ], Index);
    return Index;
}());
exports.Index = Index;
