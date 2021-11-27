import {Column} from "typeorm";

export class TypeOfAccountTypeORM {
  @Column('varchar', {name: 'type_of_account', length: 50, nullable: false })
  public typeOfAccount: string;

  private constructor(typeOfAccount: string) {
    this.typeOfAccount = typeOfAccount;
  }

  public static from(typeOfAccount: string) : TypeOfAccountTypeORM {
    return new TypeOfAccountTypeORM(typeOfAccount);
  }
}