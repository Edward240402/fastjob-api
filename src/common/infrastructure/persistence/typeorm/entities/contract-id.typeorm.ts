import { Column } from "typeorm";

export class ContractIdTypeorm {
  @Column('bigint', {name: 'contract_id', nullable: false, unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): ContractIdTypeorm {
    return new ContractIdTypeorm(value);
  }
}