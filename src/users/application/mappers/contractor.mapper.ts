import { Contractor } from "../../domain/entities/contractor.entity";
import { ContractorTypeORM } from "../../infrastructure/persistence/typeorm/entities/contractorTypeORM";
import { NameTypeORM } from "../../infrastructure/persistence/typeorm/entities/name.typeorm";
import { EmailTypeORM } from "../../infrastructure/persistence/typeorm/entities/email.typeorm";
import { PasswordTypeORM } from "../../infrastructure/persistence/typeorm/entities/password.typeorm";
import { AgeTypeORM } from "../../infrastructure/persistence/typeorm/entities/age.typeorm";
import { RateTypeORM } from "../../infrastructure/persistence/typeorm/entities/rate.typeorm";
import { NumberOfRatesTypeORM } from "../../infrastructure/persistence/typeorm/entities/number.of.rates.typeorm";
import { ContractorIdTypeORM } from "../../infrastructure/persistence/typeorm/entities/contractor.id.typeorm";

export class ContractorMapper{
  public static toTypeORM(contractor: Contractor): ContractorTypeORM {
    const contractorTypeORM: ContractorTypeORM = new ContractorTypeORM();
    contractorTypeORM.id = ContractorIdTypeORM.from(contractor.getId().getValue());
    contractorTypeORM.name = NameTypeORM.from(contractor.getName().getName());
    contractorTypeORM.email = EmailTypeORM.from(contractor.getEmail().getEmail());
    contractorTypeORM.password = PasswordTypeORM.from(contractor.getPassword().getPassword());
    contractorTypeORM.age = AgeTypeORM.from(contractor.getAge().getAge());
    contractorTypeORM.rate = RateTypeORM.from(contractor.getRate());
    contractorTypeORM.numberOfRates = NumberOfRatesTypeORM.from(contractor.getNumberOfRates());
    return contractorTypeORM;
  }
}