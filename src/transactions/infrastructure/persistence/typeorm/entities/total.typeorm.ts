import { Column } from "typeorm";

export class TotalTypeORM{
  @Column('float', {name: 'total', nullable: false, unsigned: true })
  public total: number;

  private constructor(total: number) {
    this.total = total;
  }

  public static from(total: number) : TotalTypeORM {
    return new TotalTypeORM(total);
  }
}