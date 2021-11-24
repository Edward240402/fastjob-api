import { Payment } from "../abstract/discount-interface";

export class VipEmployeeDecorator implements Payment {
    constructor(private readonly decorator: Payment) { }

    private readonly discountAmount: number = 0.05;

    calculate(input: number): number {
        console.log(`${this.constructor.name} dapproved to reduce interest cost.`);
        input = (input * (1 - this.discountAmount));
        return this.decorator.calculate(input);
    }
}