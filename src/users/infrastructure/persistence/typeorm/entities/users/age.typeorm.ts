import { Column } from "typeorm";

export class AgeTypeORM{
  @Column('int', {name: 'age', nullable: false, unsigned: true })
  public age: number;

  private constructor(age: number) {
    this.age = age;
  }

  public static from(age: number) : AgeTypeORM {
    return new AgeTypeORM(age);
  }
}