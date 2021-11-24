import { Employee } from "./src/abstract/Employee";
import { Job } from "./src/Job";
import { BasePayment } from "./src/concrete/base-payment";
import { SpecialPriceDecorator } from "./src/concrete/special-price.decorator";
import { VipEmployeeDecorator } from "./src/concrete/vip-customer.decorator";
import { NormalEmployeeDecorator } from './src/concrete/Normal-Employee-decorator';

const employee = new Employee("Eduardo Flores", false, "NORMAL");
const job = new Job(1, 2500);

let discount = new BasePayment();

if (employee.promotionDay) {
    discount = new SpecialPriceDecorator(discount);
}

if (employee.type === 'VIP') {
    discount = new VipEmployeeDecorator(discount);
}

if (employee.type === 'NORMAL') {
    discount = new NormalEmployeeDecorator(discount);
}


job.setSpecialPrice(
    discount.calculate(job.payment));

console.log(job);