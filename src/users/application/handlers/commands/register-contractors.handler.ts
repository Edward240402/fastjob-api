import { RegisterContractorCommand } from "../../commands/register-contractor.command";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { ContractorTypeORM } from "../../../infrastructure/persistence/typeorm/entities/contractorTypeORM";
import { Repository } from "typeorm";
import { RegisterUserTemplate } from "../../../../common/application/handlers/commands/register-user-template";
import { RegisterContractorManager } from "../../commands/template/concrete/register-contractor.manager";

@CommandHandler(RegisterContractorCommand)
export class RegisterContractorsHandler implements ICommandHandler<RegisterContractorCommand> {
  constructor(
    @InjectRepository(ContractorTypeORM)
    private contractorRepository: Repository<ContractorTypeORM>,
    private publisher: EventPublisher
  ) {}

  async execute(command: RegisterContractorCommand){

    let regiterContractorManager: RegisterUserTemplate = new RegisterContractorManager(command, this.contractorRepository, this.publisher);
    return regiterContractorManager.ProcessRegisterHandler();

  }
}