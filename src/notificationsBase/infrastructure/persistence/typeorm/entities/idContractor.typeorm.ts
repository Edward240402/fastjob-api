import { Column } from "typeorm";

export class IdContractorTypeORM{
  @Column('int', {name: 'idContractor', nullable: false, unsigned: true })
  public idContractor: number;

  private constructor(idContractor: number) {
    this.idContractor = idContractor;
  }

  public static from(idContractor: number) : IdContractorTypeORM {
    return new IdContractorTypeORM(idContractor);
  }
}