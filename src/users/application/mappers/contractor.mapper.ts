import { Contractor } from "../../domain/entities/contractor.entity";
import { ContractorTypeORM } from "../../infrastructure/persistence/typeorm/entities/users/contractor/contractorTypeORM";
import { UserIdTypeORM } from "../../infrastructure/persistence/typeorm/entities/users/user.id.typeorm";
import { NameTypeORM } from "../../infrastructure/persistence/typeorm/entities/users/name.typeorm";
import { EmailTypeORM } from "../../infrastructure/persistence/typeorm/entities/users/email.typeorm";
import { PasswordTypeORM } from "../../infrastructure/persistence/typeorm/entities/users/password.typeorm";
import { AgeTypeORM } from "../../infrastructure/persistence/typeorm/entities/users/age.typeorm";
import { RateTypeORM } from "../../infrastructure/persistence/typeorm/entities/users/rate.typeorm";
import { NumberOfRatesTypeORM } from "../../infrastructure/persistence/typeorm/entities/users/number.of.rates.typeorm";

export class ContractorMapper{
  public static toTypeORM(contractor: Contractor): ContractorTypeORM {
    const contractorTypeORM: ContractorTypeORM = new ContractorTypeORM();
    contractorTypeORM.id = UserIdTypeORM.from(contractor.getId().getValue());
    contractorTypeORM.name = NameTypeORM.from(contractor.getName().getName());
    contractorTypeORM.email = EmailTypeORM.from(contractor.getEmail().getEmail());
    contractorTypeORM.password = PasswordTypeORM.from(contractor.getPassword().getPassword());
    contractorTypeORM.age = AgeTypeORM.from(contractor.getAge().getAge());
    contractorTypeORM.rate = RateTypeORM.from(contractor.getRate());
    contractorTypeORM.numberOfRates = NumberOfRatesTypeORM.from(contractor.getNumberOfRates());
    return contractorTypeORM;
  }
}