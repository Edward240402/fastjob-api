import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { Name } from "../../../domain/value-objects/name.value";
import { Email } from "../../../domain/value-objects/email.value";
import { Password } from "../../../domain/value-objects/password.value";
import { Age } from "../../../domain/value-objects/age.value";
import { UserId } from "../../../domain/value-objects/user-id.value";
import { RegisterEmployeeCommand } from "../../commands/register-employee.command";
import { EmployeeTypeORM } from "../../../infrastructure/persistence/typeorm/entities/employee.typeorm";
import { YearsOfExperience } from "../../../domain/value-objects/years-of-experience.value";
import { Availability } from "../../../domain/value-objects/availability.value";
import { Employee } from "../../../domain/entities/employee.entity";
import { EmployeeMapper } from "../../mappers/employee.mapper";
import { UserFactory } from "../../../domain/factories/creator/abstract/user-factory";
import { UserFactoryMethod } from "../../../domain/factories/factory/UserFactoryMethod";
import { UserType } from "../../../domain/enums/UserType";

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

    let userFactory: UserFactory = UserFactoryMethod.getType(UserType.EMPLOYEE);
    let employee: Employee = new Employee(UserId.create(0), nameResult.value, emailResult.value, passwordResult.value, ageResult.value, 0, 0
      , yearsOfExperienceResult.value.getYearsOfExperience(), availabilityResult.value.getAvailability());
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