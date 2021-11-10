import { PrimaryGeneratedColumn } from "typeorm";

export class EmployeeIdTypeORM {
  @PrimaryGeneratedColumn('increment', {type: 'bigint', name: 'employee_id', unsigned: true})
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): EmployeeIdTypeORM {
    return new EmployeeIdTypeORM(value);
  }
}