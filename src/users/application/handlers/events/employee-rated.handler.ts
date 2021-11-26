import { EventsHandler } from "@nestjs/cqrs/dist/decorators/events-handler.decorator";
import { RatingRegisteredEvent } from "../../../../rating/domain/events/rating-registered.event";
import { CommandBus, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { ContractorTypeORM } from "../../../infrastructure/persistence/typeorm/entities/contractorTypeORM";
import { getManager, Repository } from "typeorm";
import { EmployeeTypeORM } from "../../../infrastructure/persistence/typeorm/entities/employee.typeorm";
import { ContractTypeORM } from "../../../../contracts/infrastructure/persistence/typeorm/entities/contract.typeorm";
import { Employee } from "../../../domain/entities/employee.entity";
import { UserId } from "../../../domain/value-objects/user-id.value";
import { Name } from "../../../domain/value-objects/name.value";
import { Email } from "../../../domain/value-objects/email.value";
import { Password } from "../../../domain/value-objects/password.value";
import { Age } from "../../../domain/value-objects/age.value";
import { Rate } from "../../../../rating/domain/value-objects/rate.value";
import { YearsOfExperience } from "../../../domain/value-objects/years-of-experience.value";
import { Availability } from "../../../domain/value-objects/availability.value";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { EmployeeMapper } from "../../mappers/employee.mapper";

@EventsHandler(RatingRegisteredEvent)
export class EmployeeRatedHandler implements IEventHandler<RatingRegisteredEvent>{
  constructor(
    @InjectRepository(ContractTypeORM)
    private contractRepository: Repository<ContractTypeORM>,

    @InjectRepository(EmployeeTypeORM)
    private employeeRepository: Repository<EmployeeTypeORM>
  ) {}

  async handle(event: RatingRegisteredEvent){
    const contractTypeORM: ContractTypeORM = await this.contractRepository
      .createQueryBuilder()
      .where("id = :id")
      .setParameter("id", Number(event.contractId))
      .getOne();
    if(contractTypeORM == null){
      console.log('Contract not found');
      return;
    }

    let employeeTypeORM: EmployeeTypeORM = await this.employeeRepository
      .createQueryBuilder()
      .where("employee_id = :id")
      .setParameter("id", Number(contractTypeORM.employee_id.value))
      .getOne();
    if(employeeTypeORM == null){
      console.log('Employee not found');
      return;
    }

    const nameResult: Result<AppNotification, Name> = Name.create(employeeTypeORM.name.name);
    if(nameResult.isFailure()){
      return;
    }

    const emailResult: Result<AppNotification, Email> = Email.create(employeeTypeORM.email.email);
    if(emailResult.isFailure()){
      return;
    }

    const passwordResult: Result<AppNotification, Password> = Password.create(employeeTypeORM.password.password);
    if(passwordResult.isFailure()){
      return;
    }

    const ageResult: Result<AppNotification, Age> = Age.create(employeeTypeORM.age.age);
    if(ageResult.isFailure()){
      return;
    }

    const yearsOfExperienceResult: Result<AppNotification, YearsOfExperience> = YearsOfExperience.create(employeeTypeORM.yearsOfExperience.yearsOfExperience);
    if(yearsOfExperienceResult.isFailure()){
      return;
    }

    const availabilityResult: Result<AppNotification, Availability> = Availability.create(employeeTypeORM.availability.availability);
    if(availabilityResult.isFailure()){
      return;
    }

    const id: UserId = UserId.create(employeeTypeORM.id.value);
    const rate: number = employeeTypeORM.rate.rate;
    const numberOfRates: number = employeeTypeORM.numberOfRates.numberOfRates;

    let employee: Employee = new Employee(id, nameResult.value, emailResult.value, passwordResult.value, ageResult.value,
      rate, numberOfRates, yearsOfExperienceResult.value.getYearsOfExperience(), availabilityResult.value.getAvailability());
    const newRate: Result<AppNotification, Rate> = Rate.create(event.rate);
    if(newRate.isFailure()){
      console.log('New Rate error');
      return;
    }
    employee.addRate(newRate.value);

    employeeTypeORM = EmployeeMapper.toTypeORM(employee);
    await getManager().transaction(async transactionalEntityManager => {
      employeeTypeORM = await this.employeeRepository.save(employeeTypeORM);
      if(employeeTypeORM == null){
        console.log('Employee rating error');
        return;
      }
    });
  }
}