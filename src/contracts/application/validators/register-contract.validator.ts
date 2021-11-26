import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContractTypeORM } from "../../infrastructure/persistence/typeorm/entities/contract.typeorm";
import { Repository } from "typeorm";
import { RegisterContractRequestDto } from "../dtos/request/register-contract-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { EmployeeTypeORM } from "../../../users/infrastructure/persistence/typeorm/entities/employee.typeorm";
import { ContractorTypeORM } from "../../../users/infrastructure/persistence/typeorm/entities/contractorTypeORM";

@Injectable()
export class RegisterContractValidator{
  constructor(
    @InjectRepository(ContractTypeORM)
    private contractRepository: Repository<ContractTypeORM>,

    @InjectRepository(EmployeeTypeORM)
    private employeeRepository: Repository<EmployeeTypeORM>,

    @InjectRepository(ContractorTypeORM)
    private contractorRepository: Repository<ContractorTypeORM>
  ) {}

  public async validate(registerContractRequestDto: RegisterContractRequestDto): Promise<AppNotification>{
    let notification: AppNotification = new AppNotification();
    const jobType: string = registerContractRequestDto.jobType.trim();
    if(jobType.length <= 0){
      notification.addError('Job Type is required', null);
    }

    const state: string = registerContractRequestDto.state.trim();
    if (state.length <= 0){
      notification.addError('State is required', null);
    }
    if(state != "Finished" && state != "Accepted" && state != "Canceled"){
      notification.addError('Not valid state', null);
    }

    if(notification.hasErrors()){
      return notification;
    }

    let id: number = registerContractRequestDto.employeeId;
    const employee: EmployeeTypeORM = await this.employeeRepository.createQueryBuilder().where("employee_id = :id", { id }).getOne();
    if(employee == null){
      notification.addError('Employee not found', null);
    }

    id = registerContractRequestDto.contractorId;
    const contractor: ContractorTypeORM = await this.contractorRepository.createQueryBuilder().where('contractor_id = :id', { id }).getOne();
    if(contractor == null){
      notification.addError('Contractor not found', null);
    }

    return notification;
  }
}