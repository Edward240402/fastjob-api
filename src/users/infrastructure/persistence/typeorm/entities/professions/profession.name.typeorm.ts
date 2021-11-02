import {Column} from "typeorm";

export class ProfessionNameTypeORM {
  @Column('varchar', {name: 'profession_name', length: 75, nullable: false })
  public name: string;

  private constructor(name: string) {
    this.name = name;
  }

  public static from(name: string) : ProfessionNameTypeORM {
    return new ProfessionNameTypeORM(name);
  }
}