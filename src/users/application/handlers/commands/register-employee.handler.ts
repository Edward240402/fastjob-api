import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegisterEmployeeCommand } from "../../commands/register-employee.command";
import { EmployeeTypeORM } from "../../../infrastructure/persistence/typeorm/entities/employee.typeorm";
import { RegisterUserTemplate } from "../../../../common/application/handlers/commands/register-user-template";
import { RegisterEmployeeManager } from "../../commands/template/concrete/register-employee.manager";

@CommandHandler(RegisterEmployeeCommand)
export class RegisterEmployeeHandler implements ICommandHandler<RegisterEmployeeCommand> {
  constructor(
    @InjectRepository(EmployeeTypeORM)
    private employeeRepository: Repository<EmployeeTypeORM>,
    private publisher: EventPublisher
  ) {}

  async execute(command: RegisterEmployeeCommand){
    let registerEmployeeManager: RegisterUserTemplate = new RegisterEmployeeManager(command, this.employeeRepository, this.publisher);
    return registerEmployeeManager.ProcessRegisterHandler();
  }
}