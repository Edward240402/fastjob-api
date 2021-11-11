import { Column } from "typeorm";

export class EmployeeIdTypeorm {
  @Column('bigint', {name: 'employee_id', nullable: false, unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): EmployeeIdTypeorm {
    return new EmployeeIdTypeorm(value);
  }
}