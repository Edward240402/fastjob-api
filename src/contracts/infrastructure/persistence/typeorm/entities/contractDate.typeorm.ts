import { Column } from "typeorm";

export class ContractDateTypeORM{
  @Column('datetime', {name: 'contract_date', nullable: false })
  public date: Date;

  private constructor(date: Date) {
    this.date = date;
  }

  public static from(date: Date) : ContractDateTypeORM {
    return new ContractDateTypeORM(date);
  }
}