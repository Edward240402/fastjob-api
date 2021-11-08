import { Column, Unique } from 'typeorm';

export class IdContractorTypeORM {
  @Column('varchar', { name: 'idContractor', length: 8, nullable: false })
  value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): IdContractorTypeORM {
    return new IdContractorTypeORM(value);
  }
}