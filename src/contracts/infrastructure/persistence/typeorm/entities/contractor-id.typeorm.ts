import { Column } from "typeorm";

export class ContractorIdTypeorm {
  @Column('bigint', {name: 'contractor_id', nullable: false, unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): ContractorIdTypeorm {
    return new ContractorIdTypeorm(value);
  }
}