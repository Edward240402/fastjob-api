import { PrimaryGeneratedColumn } from "typeorm";

export class RatingIdTypeORM {
  @PrimaryGeneratedColumn('increment', {type: 'bigint', name: 'id', unsigned: true})
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): RatingIdTypeORM {
    return new RatingIdTypeORM(value);
  }
}