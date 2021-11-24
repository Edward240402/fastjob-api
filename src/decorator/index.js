"use strict";
exports.__esModule = true;
var customer_1 = require("./src/customer");
var product_1 = require("./src/product");
var base_price_1 = require("./src/base-price");
var special_price_decorator_1 = require("./src/decorators/special-price.decorator");
var vip_customer_decorator_1 = require("./src/decorators/vip-customer.decorator");
var Normal_Employee_decorator_1 = require("./src/decorators/Normal-Employee-decorator");
var employee = new customer_1.Employee("Eduardo Flores", false, "NORMAL");
var job = new product_1.Job(1, 2500);
var discount = new base_price_1.BasePayment();
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
