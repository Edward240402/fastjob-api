import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { Name } from "../../../domain/value-objects/users/name.value";
import { Email } from "../../../domain/value-objects/users/email.value";
import { Password } from "../../../domain/value-objects/users/password.value";
import { Age } from "../../../domain/value-objects/users/age.value";
import { Contractor } from "../../../domain/entities/contractor.entity";
import { UserId } from "../../../domain/value-objects/users/user-id.value";
import { ContractorMapper } from "../../mappers/contractor.mapper";
import { RegisterEmployeeCommand } from "../../commands/register-employee.command";
import { EmployeeTypeORM } from "../../../infrastructure/persistence/typeorm/entities/users/employee/employee.typeorm";
import { YearsOfExperience } from "../../../domain/value-objects/users/years-of-experience.value";
import { Availability } from "../../../domain/value-objects/users/availability.value";
import { Employee } from "../../../domain/entities/employee.entity";
import { ProfessionId } from "../../../domain/value-objects/professions/profession-id.value";
import { EmployeeMapper } from "../../mappers/employee.mapper";

@CommandHandler(RegisterEmployeeCommand)
export class RegisterEmployeeHandler implements ICommandHandler<RegisterEmployeeCommand> {
  constructor(
    @InjectRepository(EmployeeTypeORM)
    private employeeRepository: Repository<EmployeeTypeORM>,
    private publisher: EventPublisher
  ) {}

  async execute(command: RegisterEmployeeCommand){
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

    const yearsOfExperienceResult: Result<AppNotification, YearsOfExperience> = YearsOfExperience.create(command.yearsOfExperience);
    if(yearsOfExperienceResult.isFailure()){
      return 0;
    }

    const availabilityResult: Result<AppNotification, Availability> = Availability.create(command.availability);
    if(availabilityResult.isFailure()){
      return 0;
    }

    let employee: Employee = new Employee(UserId.create(0), nameResult.value, emailResult.value, passwordResult.value, ageResult.value, 0, 0,
      command.professionId, yearsOfExperienceResult.value.getYearsOfExperience(), availabilityResult.value.getAvailability());
    let employeeTypeORM = EmployeeMapper.toTypeORM(employee);
    employeeTypeORM = await this.employeeRepository.save(employeeTypeORM);
    if(employeeTypeORM == null){
      return 0;
    }

    const employeeId: number = Number(employeeTypeORM.id.value);
    employee.changeId(UserId.create(employeeId));
    employee = this.publisher.mergeObjectContext(employee);
    employee.register();
    employee.commit();
    return employeeId;
  }
}