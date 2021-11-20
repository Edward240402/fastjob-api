import { RegisterContractorCommand } from "../../commands/register-contractor.command";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { ContractorTypeORM } from "../../../infrastructure/persistence/typeorm/entities/contractorTypeORM";
import { Repository } from "typeorm";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { Name } from "../../../domain/value-objects/name.value";
import { Email } from "../../../domain/value-objects/email.value";
import { Password } from "../../../domain/value-objects/password.value";
import { Age } from "../../../domain/value-objects/age.value";
import { Contractor } from "../../../domain/entities/contractor.entity";
import { UserId } from "../../../domain/value-objects/user-id.value";
import { ContractorMapper } from "../../mappers/contractor.mapper";
import { UserFactory } from "../../../domain/factories/creator/abstract/user-factory";
import { UserFactoryMethod } from "../../../domain/factories/factory/UserFactoryMethod";
import { UserType } from "../../../domain/enums/UserType";

@CommandHandler(RegisterContractorCommand)
export class RegisterContractorsHandler implements ICommandHandler<RegisterContractorCommand> {
  constructor(
    @InjectRepository(ContractorTypeORM)
    private contractorRepository: Repository<ContractorTypeORM>,
    private publisher: EventPublisher
  ) {}

  async execute(command: RegisterContractorCommand){
    const nameResult: Result<AppNotification, Name> = Name.create(command.name);
    if(nameResult.isFailure()){
      return 0;
    }

    const emailResult: Result<AppNotification, Email> = Email.create(command.email);
    if(emailResult.isFailure()){
      return 0;
    }

    const passwordResult: Result<AppNotification, Password> = Password.create(command.password);
    if(passwordResult.isFailure()){
      return 0;
    }

    const ageResult: Result<AppNotification, Age> = Age.create(command.age);
    if(ageResult.isFailure()){
      return 0;
    }

    let userFactory: UserFactory = UserFactoryMethod.getType(UserType.CONTRACTOR);
    let contractor: Contractor = userFactory.
    //let contractor: Contractor = new Contractor(UserId.create(0), nameResult.value, emailResult.value, passwordResult.value, ageResult.value, 0, 0);
    let contractorTypeORM = ContractorMapper.toTypeORM(contractor);
    contractorTypeORM = await this.contractorRepository.save(contractorTypeORM);
    if(contractorTypeORM == null){
      return 0;
    }

    const contractorId: number = Number(contractorTypeORM.id.value);
    contractor.changeId(UserId.create(contractorId));
    contractor = this.publisher.mergeObjectContext(contractor);
    contractor.register();
    contractor.commit();
    return contractorId;
  }
}