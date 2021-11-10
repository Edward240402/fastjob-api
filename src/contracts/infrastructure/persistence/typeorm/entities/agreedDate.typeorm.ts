import { Column } from "typeorm";

export class AgreedDateTypeorm{
  @Column('datetime', {name: 'agreed_date', nullable: true })
  public date: string;

  private constructor(date: string) {
    this.date = date;
  }

  public static from(date: string) : AgreedDateTypeorm {
    return new AgreedDateTypeorm(date);
  }
}