import { Column, Entity, Unique } from "typeorm";
import { YearsOfExperienceTypeORM } from "./years.of.experience.typeorm";
import { AvailabilityTypeORM } from "./availabilityTypeORM";
import { UserIdTypeORM } from "./user.id.typeorm";
import { NameTypeORM } from "./name.typeorm";
import { EmailTypeORM } from "./email.typeorm";
import { PasswordTypeORM } from "./password.typeorm";
import { AgeTypeORM } from "./age.typeorm";
import { RateTypeORM } from "./rate.typeorm";
import { NumberOfRatesTypeORM } from "./number.of.rates.typeorm";
import { EmployeeIdTypeORM } from "./employee.id.typeorm";

@Entity('employees')
@Unique('UQ_employees_employee_id', ['id.value'])
export class EmployeeTypeORM {
  @Column(type => EmployeeIdTypeORM, { prefix: false })
  public id: EmployeeIdTypeORM;

  @Column(type => NameTypeORM, {prefix: false})
  public name: NameTypeORM;

  @Column(type => EmailTypeORM, {prefix: false})
  public email: EmailTypeORM;

  @Column(type => PasswordTypeORM, {prefix: false})
  public password: PasswordTypeORM;

  @Column(type => AgeTypeORM, {prefix: false})
  public age: AgeTypeORM;

  @Column(type => RateTypeORM, {prefix: false})
  public rate: RateTypeORM;

  @Column(type => NumberOfRatesTypeORM, {prefix: false})
  public numberOfRates: NumberOfRatesTypeORM;

  @Column(type => YearsOfExperienceTypeORM, {prefix: false})
  public yearsOfExperience: YearsOfExperienceTypeORM;

  @Column(type => AvailabilityTypeORM, {prefix: false})
  public availability: AvailabilityTypeORM;
}