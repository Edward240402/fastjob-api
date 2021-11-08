import { Column, Unique } from 'typeorm';

export class IdEmployeeTypeORM {
  @Column('varchar', { name: 'idEmployee', length: 8, nullable: false })
  value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): IdEmployeeTypeORM {
    return new IdEmployeeTypeORM(value);
  }
}