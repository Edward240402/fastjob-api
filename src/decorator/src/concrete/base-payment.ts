import { Payment } from "../abstract/discount-interface";

export class BasePayment implements Payment {
    calculate(input: number): number {
        console.log(`${this.constructor.name} discount applied.`);
        return input;
    }
}