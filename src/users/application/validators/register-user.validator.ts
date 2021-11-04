import { InjectRepository } from "@nestjs/typeorm";
import { ContractorTypeORM } from "../../infrastructure/persistence/typeorm/entities/contractorTypeORM";
import { Repository } from "typeorm";
import { EmployeeTypeORM } from "../../infrastructure/persistence/typeorm/entities/employee.typeorm";
import { Injectable } from "@nestjs/common";
import { RegisterContractorRequestDto } from "../dtos/request/register-contractor-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { RegisterEmployeeRequestDto } from "../dtos/request/register-employee-request.dto";

@Injectable()
export class RegisterUserValidator{
  constructor(
    @InjectRepository(ContractorTypeORM)
    private contractorRepository: Repository<ContractorTypeORM>,

    @InjectRepository(EmployeeTypeORM)
    private employeeRepository: Repository<EmployeeTypeORM>,
  ) {}

  public async validateContractor(registerContractorRequestDto: RegisterContractorRequestDto): Promise<AppNotification>{
    const notification: AppNotification = new AppNotification();

    const name: string = registerContractorRequestDto.name.trim();
    if(name.length <= 0){
      notification.addError('User name is required', null);
    }

    const email: string = registerContractorRequestDto.email.trim();
    if(email.length <= 0){
      notification.addError('User email is required', null);
    }

    const password: string = registerContractorRequestDto.password.trim();
    if(password.length <= 0){
      notification.addError('User password is required', null);
    }
    else if(password.length <= 7){
      notification.addError('User password must be at least 8 characters', null);
    }

    if(registerContractorRequestDto.age <= 17){
      notification.addError('User must be at least 18 years old', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const contractor: ContractorTypeORM = await this.contractorRepository.createQueryBuilder().where("email = :email", {email}).getOne();
    if(contractor != null){
      notification.addError('User email is taken', null);
    }
    return notification;
  }

  public async validateEmployee(registerEmployeeRequestDto: RegisterEmployeeRequestDto): Promise<AppNotification>{
    const notification: AppNotification = new AppNotification();

    const name: string = registerEmployeeRequestDto.name.trim();
    if(name.length <= 0){
      notification.addError('User name is required', null);
    }

    const email: string = registerEmployeeRequestDto.email.trim();
    if(email.length <= 0){
      notification.addError('User email is required', null);
    }

    const password: string = registerEmployeeRequestDto.password.trim();
    if(password.length <= 0){
      notification.addError('User password is required', null);
    }
    else if(password.length <= 7){
      notification.addError('User password must be at least 8 characters', null);
    }

    if(registerEmployeeRequestDto.age <= 17){
      notification.addError('User must be at least 18 years old', null);
    }

    if(registerEmployeeRequestDto.yearsOfExperience < 0){
      notification.addError('User years of experience is not valid', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const employee: EmployeeTypeORM = await this.employeeRepository.createQueryBuilder().where("email = :email", {email}).getOne();
    if(employee != null){
      notification.addError('User email is taken', null);
    }

    return notification;
  }
}