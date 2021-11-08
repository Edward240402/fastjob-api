import { Column } from "typeorm";

export class IdContractorTypeORM{
  @Column('int', {name: 'idContractor', nullable: false, unsigned: true })
  public age: number;

  private constructor(idContractor: number) {
    this.age = idContractor;
  }

  public static from(age: number) : IdContractorTypeORM {
    return new IdContractorTypeORM(age);
  }
}