import { Column } from "typeorm";

export class IdEmployeeTypeORM{
  @Column('int', {name: 'idEmployee', nullable: false, unsigned: true })
  public idEmployee: number;

  private constructor(idEmployee: number) {
    this.idEmployee = idEmployee;
  }

  public static from(age: number) : IdEmployeeTypeORM {
    return new IdEmployeeTypeORM(age);
  }
}