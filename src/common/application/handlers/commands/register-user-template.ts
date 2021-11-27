import { Result } from "typescript-result";
import { AppNotification } from "../../app.notification";
import { Name } from "../../../../users/domain/value-objects/name.value";
import { Email } from "../../../../users/domain/value-objects/email.value";
import { Password } from "../../../../users/domain/value-objects/password.value";
import { Age } from "../../../../users/domain/value-objects/age.value";
import { InjectRepository } from "@nestjs/typeorm";
import { ContractorTypeORM } from "../../../../users/infrastructure/persistence/typeorm/entities/contractorTypeORM";
import { Repository } from "typeorm";
import { EventPublisher } from "@nestjs/cqrs";
import { EmployeeTypeORM } from "../../../../users/infrastructure/persistence/typeorm/entities/employee.typeorm";


export abstract class RegisterUserTemplate{
  protected nameResult: Result<AppNotification, Name>;
  protected emailResult: Result<AppNotification, Email>;
  protected passwordResult: Result<AppNotification, Password>;
  protected ageResult: Result<AppNotification, Age>;
  protected userId: number;

  @InjectRepository(ContractorTypeORM)
  protected contractorRepository: Repository<ContractorTypeORM>;
  @InjectRepository(EmployeeTypeORM)
  protected employeeRepository: Repository<EmployeeTypeORM>;
  protected publisher: EventPublisher

  abstract validateData(): void;
  abstract createId(): void;

  public ProcessRegisterHandler(): number{
    this.validateData();
    if(this.userId != 0)
      this.createId();
    return this.userId;
  }
}