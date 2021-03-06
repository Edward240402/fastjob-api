import { Column } from "typeorm";

export class PostIdTypeorm {
  @Column('bigint', {name: 'post_id', nullable: false, unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): PostIdTypeorm {
    return new PostIdTypeorm(value);
  }
}