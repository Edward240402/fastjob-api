import { UserTypeORM } from "../user.typeorm";
import { Column } from "typeorm";
import { ProfessionIdTypeORM } from "../../professions/profession.id.typeorm";
import { YearsOfExperienceTypeORM } from "./years.of.experience.typeorm";
import { AvailabilityTypeORM } from "./availabilityTypeORM";

export class EmployeeTypeORM extends UserTypeORM {
  @Column(type => ProfessionIdTypeORM, {prefix: false})
  public professionId: ProfessionIdTypeORM;

  @Column(type => YearsOfExperienceTypeORM, {prefix: false})
  public yearsOfExperience: YearsOfExperienceTypeORM;

  @Column(type => AvailabilityTypeORM, {prefix: false})
  public availability: AvailabilityTypeORM;
}