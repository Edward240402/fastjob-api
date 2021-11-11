import {Column} from "typeorm";

export class TextTypeORM {
  @Column('varchar', {name: 'text', length: 1000, nullable: false })
  public text: string;

  private constructor(text: string) {
    this.text = text;
  }

  public static from(text: string) : TextTypeORM {
    return new TextTypeORM(text);
  }
}