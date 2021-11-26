"use strict";
exports.__esModule = true;
var Employee_1 = require("./src/abstract/Employee");
var Job_1 = require("./src/Job");
var base_payment_1 = require("./src/concrete/base-payment");
var special_price_decorator_1 = require("./src/concrete/special-price.decorator");
var vip_customer_decorator_1 = require("./src/concrete/vip-customer.decorator");
var Normal_Employee_decorator_1 = require("./src/concrete/Normal-Employee-decorator");
var employee = new Employee_1.Employee("Eduardo Flores", false, "NORMAL");
var job = new Job_1.Job(1, 2500);
var discount = new base_payment_1.BasePayment();
if (employee.promotionDay) {
    discount = new special_price_decorator_1.SpecialPriceDecorator(discount);
}
if (employee.type === 'VIP') {
    discount = new vip_customer_decorator_1.VipEmployeeDecorator(discount);
}
if (employee.type === 'NORMAL') {
    discount = new Normal_Employee_decorator_1.NormalEmployeeDecorator(discount);
}
job.setSpecialPrice(discount.calculate(job.payment));
console.log(job);
