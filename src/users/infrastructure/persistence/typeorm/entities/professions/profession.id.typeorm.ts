import { PrimaryGeneratedColumn } from "typeorm";

export class ProfessionIdTypeORM {
  @PrimaryGeneratedColumn('increment', {type: 'bigint', name: 'profession_id', unsigned: true})
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): ProfessionIdTypeORM {
    return new ProfessionIdTypeORM(value);
  }
}