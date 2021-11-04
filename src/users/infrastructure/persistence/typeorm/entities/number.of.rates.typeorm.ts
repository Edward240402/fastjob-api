import { Column } from "typeorm";

export class NumberOfRatesTypeORM{
  @Column('int', {name: 'number_of_rates', nullable: false, unsigned: true })
  public numberOfRates: number;

  private constructor(numberOfRates: number) {
    this.numberOfRates = numberOfRates;
  }

  public static from(numberOfRates: number) : NumberOfRatesTypeORM {
    return new NumberOfRatesTypeORM(numberOfRates);
  }
}