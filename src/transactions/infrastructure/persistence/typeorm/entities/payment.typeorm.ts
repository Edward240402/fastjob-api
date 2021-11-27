import { Column } from "typeorm";

export class PaymentTypeORM{
  @Column('float', {name: 'payment', nullable: false, unsigned: true })
  public payment: number;

  private constructor(payment: number) {
    this.payment = payment;
  }

  public static from(payment: number) : PaymentTypeORM {
    return new PaymentTypeORM(payment);
  }
}