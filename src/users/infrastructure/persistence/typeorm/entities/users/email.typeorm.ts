import {Column} from "typeorm";

export class EmailTypeORM {
  @Column('varchar', {name: 'email', length: 25, nullable: false })
  public email: string;

  private constructor(email: string) {
    this.email = email;
  }

  public static from(email: string) : EmailTypeORM {
    return new EmailTypeORM(email);
  }
}