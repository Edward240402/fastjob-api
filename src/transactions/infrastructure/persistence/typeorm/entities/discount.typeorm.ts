import { Column } from "typeorm";

export class DiscountTypeORM{
  @Column('float', {name: 'discount', nullable: false, unsigned: true })
  public discount: number;

  private constructor(discount: number) {
    this.discount = discount;
  }

  public static from(discount: number) : DiscountTypeORM {
    return new DiscountTypeORM(discount);
  }
}