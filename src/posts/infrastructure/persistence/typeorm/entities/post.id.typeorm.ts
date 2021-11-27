import { PrimaryGeneratedColumn } from "typeorm";

export class PostIdTypeORM {
  @PrimaryGeneratedColumn('increment', {type: 'bigint', name: 'id', unsigned: true})
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): PostIdTypeORM {
    return new PostIdTypeORM(value);
  }
}