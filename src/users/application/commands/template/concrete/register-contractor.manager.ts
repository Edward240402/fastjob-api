import { RegisterUserTemplate } from "../../../../../common/application/handlers/commands/register-user-template";
import { RegisterContractorCommand } from "../../register-contractor.command";
import { Name } from "../../../../domain/value-objects/name.value";
import { Email } from "../../../../domain/value-objects/email.value";
import { Password } from "../../../../domain/value-objects/password.value";
import { Age } from "../../../../domain/value-objects/age.value";
import { Contractor } from "../../../../domain/entities/contractor.entity";
import { UserId } from "../../../../domain/value-objects/user-id.value";
import { ContractorMapper } from "../../../mappers/contractor.mapper";
import { InjectRepository } from "@nestjs/typeorm";
import { ContractorTypeORM } from "../../../../infrastructure/persistence/typeorm/entities/contractorTypeORM";
import { Repository } from "typeorm";
import { EventPublisher } from "@nestjs/cqrs";
import { UserFactory } from "../../../../domain/factories/creator/abstract/user-factory";
import { UserFactoryMethod } from "../../../../domain/factories/factory/UserFactoryMethod";
import { UserType } from "../../../../domain/enums/UserType";

export class RegisterContractorManager extends RegisterUserTemplate{
  private contractorCommand: RegisterContractorCommand
  private contractor: Contractor;
  private contractorTypeORM: ContractorTypeORM;

  constructor(command: RegisterContractorCommand,
              @InjectRepository(ContractorTypeORM) contractorRepository: Repository<ContractorTypeORM>,
              publisher: EventPublisher)
  {
    super();
    this.userId = 0;
    this.contractorCommand = command;
    this.contractorRepository = contractorRepository;
    this.publisher = publisher;
  }

  public async validateData() {
    this.nameResult = Name.create(this.contractorCommand.name);
    if(this.nameResult.isFailure()){
      this.userId = 0;
      return;
    }

    this.emailResult = Email.create(this.contractorCommand.email);
    if(this.emailResult.isFailure()){
      this.userId = 0;
      return;
    }

    this.passwordResult = Password.create(this.contractorCommand.password);
    if(this.passwordResult.isFailure()){
      this.userId = 0;
      return;
    }

    this.ageResult = Age.create(this.contractorCommand.age);
    if(this.ageResult.isFailure()){
      this.userId = 0;
      return;
    }

    const userFactory: UserFactory = UserFactoryMethod.getType(UserType.CONTRACTOR);
    this.contractor = userFactory.createUser(UserId.create(0), this.nameResult.value, this.emailResult.value, this.passwordResult.value, this.ageResult.value, 0, 0, null, null);

    //this.contractor = new Contractor(UserId.create(0), this.nameResult.value, this.emailResult.value, this.passwordResult.value, this.ageResult.value, 0, 0);
    this.contractorTypeORM = ContractorMapper.toTypeORM(this.contractor);
    this.contractorTypeORM = await this.contractorRepository.save(this.contractorTypeORM);
    if(this.contractorTypeORM == null){
      this.userId = 0;
      return;
    }
  }

  public createId() {
    this.userId = Number(this.contractorTypeORM.id.value);
    this.contractor.changeId(UserId.create(this.userId));
    this.contractor = this.publisher.mergeObjectContext(this.contractor);
    this.contractor.register();
    this.contractor.commit();
  }
}