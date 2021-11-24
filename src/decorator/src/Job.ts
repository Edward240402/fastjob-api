export class Job {
    public actual_payment: number = 0;
    public discount: number = 0;

    constructor(
        public id: number,
        public payment: number
    ) { }

    setSpecialPrice(input: number) {
        if (this.payment > input) {
            this.actual_payment = input;
            this.discount = 1 - this.actual_payment / this.payment;
        }
    }
}