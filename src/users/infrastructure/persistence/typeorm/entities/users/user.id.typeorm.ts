import { PrimaryGeneratedColumn } from "typeorm";

export class UserIdTypeORM {
  @PrimaryGeneratedColumn('increment', {type: 'bigint', name: 'user_id', unsigned: true})
  public value: number;
  
  private constructor(value: number) {
    this.value = value;
  }
  
  public static from(value: number): UserIdTypeORM {
    return new UserIdTypeORM(value);
  }
}