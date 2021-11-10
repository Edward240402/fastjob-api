import { PrimaryGeneratedColumn } from "typeorm";

export class ContractorIdTypeORM {
  @PrimaryGeneratedColumn('increment', {type: 'bigint', name: 'contractor_id', unsigned: true})
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): ContractorIdTypeORM {
    return new ContractorIdTypeORM(value);
  }
}