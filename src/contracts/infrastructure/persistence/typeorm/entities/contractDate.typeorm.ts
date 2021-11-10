import { Column } from "typeorm";

export class ContractDateTypeORM{
  @Column('datetime', {name: 'contract_date', nullable: false })
  public date: string;

  private constructor(date: string) {
    this.date = date;
  }

  public static from(date: string) : ContractDateTypeORM {
    return new ContractDateTypeORM(date);
  }
}