import { Column } from 'typeorm';
export class InformationTypeORM {
  @Column('varchar', { name: 'information', length: 50, nullable: false })
  public information: string;

  private constructor(information: string) {
    this.information = information;
  }

  public static from(information: string) : InformationTypeORM {
    return new InformationTypeORM(information);
  }
}