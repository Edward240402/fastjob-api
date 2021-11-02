import { Column } from "typeorm";
import { ProfessionIdTypeORM } from "./profession.id.typeorm";
import { ProfessionNameTypeORM } from "./profession.name.typeorm";

export class ProfessionTypeORM {
  @Column(type => ProfessionIdTypeORM, { prefix: false })
  public professionId: ProfessionIdTypeORM;

  @Column(type => ProfessionNameTypeORM, { prefix: false })
  public professionName: ProfessionNameTypeORM;
}