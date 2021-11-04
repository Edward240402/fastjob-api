import {Column} from "typeorm";

export class PasswordTypeORM {
  @Column('varchar', {name: 'password', length: 25, nullable: false })
  public password: string;

  private constructor(password: string) {
    this.password = password;
  }

  public static from(password: string) : PasswordTypeORM {
    return new PasswordTypeORM(password);
  }
}