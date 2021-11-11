import { Column } from "typeorm";

export class PublishDateTypeORM {
  @Column('datetime', {name: 'published_date', nullable: true })
  public date: Date;

  private constructor(date: Date) {
    this.date = date;
  }

  public static from(date: Date) : PublishDateTypeORM {
    return new PublishDateTypeORM(date);
  }
}