import { Column, Entity, Unique } from "typeorm";
import { NameTypeORM } from "./name.typeorm";
import { EmailTypeORM } from "./email.typeorm";
import { PasswordTypeORM } from "./password.typeorm";
import { AgeTypeORM } from "./age.typeorm";
import { RateTypeORM } from "../../../../../common/infrastructure/persistence/typeorm/entities/rate.typeorm";
import { NumberOfRatesTypeORM } from "./number.of.rates.typeorm";
import { ContractorIdTypeORM } from "./contractor.id.typeorm";

@Entity('contractors')
@Unique('UQ_contractors_contractor_id', ['id.value'])
export class ContractorTypeORM {
  @Column(type => ContractorIdTypeORM, { prefix: false })
  public id: ContractorIdTypeORM;

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
}