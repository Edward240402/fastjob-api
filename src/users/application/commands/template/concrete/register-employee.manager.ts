import { RegisterUserTemplate } from "../../../../../common/application/handlers/commands/register-user-template";
import { RegisterEmployeeCommand } from "../../register-employee.command";
import { Employee } from "../../../../domain/entities/employee.entity";
import { EmployeeTypeORM } from "../../../../infrastructure/persistence/typeorm/entities/employee.typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EventPublisher } from "@nestjs/cqrs";
import { Name } from "../../../../domain/value-objects/name.value";
import { Email } from "../../../../domain/value-objects/email.value";
import { Password } from "../../../../domain/value-objects/password.value";
import { Age } from "../../../../domain/value-objects/age.value";
import { UserId } from "../../../../domain/value-objects/user-id.value";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../../common/application/app.notification";
import { YearsOfExperience } from "../../../../domain/value-objects/years-of-experience.value";
import { Availability } from "../../../../domain/value-objects/availability.value";
import { EmployeeMapper } from "../../../mappers/employee.mapper";
import { UserFactory } from "../../../../domain/factories/creator/abstract/user-factory";
import { UserFactoryMethod } from "../../../../domain/factories/factory/UserFactoryMethod";
import { UserType } from "../../../../domain/enums/UserType";
import { TypeOfAccount } from '../../../../domain/value-objects/type-of-account.value';
export class RegisterEmployeeManager extends RegisterUserTemplate{
  private employeeCommand: RegisterEmployeeCommand;
  private employee: Employee;
  private employeeTypeORM: EmployeeTypeORM;
  private yearsOfExperienceResult: Result<AppNotification, YearsOfExperience>;
  private availabilityResult: Result<AppNotification, Availability>;
  private typeOfAccountResult: Result<AppNotification, TypeOfAccount>;
  constructor(command: RegisterEmployeeCommand,
              @InjectRepository(EmployeeTypeORM) employeeRepository: Repository<EmployeeTypeORM>,
              publisher: EventPublisher)
  {
    super();
    this.userId = 0;
    this.employeeCommand = command;
    this.employeeRepository = employeeRepository;
    this.publisher = publisher;
  }

  public async validateData() {
    this.nameResult = Name.create(this.employeeCommand.name);
    if(this.nameResult.isFailure()){
      this.userId = 0;
      return;
    }

    this.emailResult = Email.create(this.employeeCommand.email);
    if(this.emailResult.isFailure()){
      this.userId = 0;
      return;
    }

    this.passwordResult = Password.create(this.employeeCommand.password);
    if(this.passwordResult.isFailure()){
      this.userId = 0;
      return;
    }

    this.ageResult = Age.create(this.employeeCommand.age);
    if(this.ageResult.isFailure()){
      this.userId = 0;
      return;
    }

    this.yearsOfExperienceResult = YearsOfExperience.create(this.employeeCommand.yearsOfExperience);
    if(this.yearsOfExperienceResult.isFailure()){
      this.userId = 0;
      return;
    }

    this.availabilityResult = Availability.create(this.employeeCommand.availability);
    if(this.availabilityResult.isFailure()){
      this.userId = 0;
      return;
    }

    this.typeOfAccountResult = TypeOfAccount.create(this.employeeCommand.typeOfAccount);
    if(this.typeOfAccountResult.isFailure()){
      this.userId = 0;
      return;
    }

    const userFactory: UserFactory = UserFactoryMethod.getType(UserType.EMPLOYEE);
    this.employee = userFactory.createUser(UserId.create(0), this.nameResult.value, this.emailResult.value, this.passwordResult.value, this.ageResult.value, 0, 0
      , this.yearsOfExperienceResult.value.getYearsOfExperience(), this.availabilityResult.value.getAvailability(),this.typeOfAccountResult.value);

    //this.employee = new Employee(UserId.create(0), this.nameResult.value, this.emailResult.value, this.passwordResult.value, this.ageResult.value, 0, 0
    //  , this.yearsOfExperienceResult.value.getYearsOfExperience(), this.availabilityResult.value.getAvailability());
    this.employeeTypeORM = EmployeeMapper.toTypeORM(this.employee);
    this.employeeTypeORM = await this.employeeRepository.save(this.employeeTypeORM);
    if(this.employeeTypeORM == null){
      this.userId = 0;
      return;
    }
  }

  public createId() {
    this.userId = Number(this.employeeTypeORM.id.value);
    this.employee.changeId(UserId.create(this.userId));
    this.employee = this.publisher.mergeObjectContext(this.employee);
    this.employee.register();
    this.employee.commit();
  }
}