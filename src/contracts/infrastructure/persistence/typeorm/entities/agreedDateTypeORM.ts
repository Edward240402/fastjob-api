import { Column } from "typeorm";

export class AgreedDateTypeORM {
  @Column('datetime', {name: 'agreed_date', nullable: true })
  public date: Date;

  private constructor(date: Date) {
    this.date = date;
  }

  public static from(date: Date) : AgreedDateTypeORM {
    return new AgreedDateTypeORM(date);
  }
}