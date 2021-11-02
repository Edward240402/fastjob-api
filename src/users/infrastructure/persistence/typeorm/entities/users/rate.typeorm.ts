import { Column } from "typeorm";

export class RateTypeORM{
  @Column('float', {name: 'rate', nullable: false, unsigned: true })
  public rate: number;

  private constructor(rate: number) {
    this.rate = rate;
  }

  public static from(rate: number) : RateTypeORM {
    return new RateTypeORM(rate);
  }
}