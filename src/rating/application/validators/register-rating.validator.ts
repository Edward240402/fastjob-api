import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RatingTypeORM } from "../../infrastructure/persistence/typeorm/entities/ratingTypeORM";
import { Repository } from "typeorm";
import { EmployeeTypeORM } from "../../../users/infrastructure/persistence/typeorm/entities/employee.typeorm";
import { ContractorTypeORM } from "../../../users/infrastructure/persistence/typeorm/entities/contractorTypeORM";
import { ContractTypeORM } from "../../../contracts/infrastructure/persistence/typeorm/entities/contract.typeorm";
import { RegisterRatingRequestDto } from "../dtos/request/register-rating-request.dto";
import { AppNotification } from "../../../common/application/app.notification";

@Injectable()
export class RegisterRatingValidator{
  constructor(
    @InjectRepository(RatingTypeORM)
    private ratingRepository: Repository<RatingTypeORM>,

    @InjectRepository(ContractTypeORM)
    private contractRepository: Repository<ContractTypeORM>,

    @InjectRepository(EmployeeTypeORM)
    private employeeRepository: Repository<EmployeeTypeORM>,

    @InjectRepository(ContractorTypeORM)
    private contractorRepository: Repository<ContractorTypeORM>
  ) {}

  public async validate(registerRatingRequestDto: RegisterRatingRequestDto): Promise<AppNotification>{
    let notification: AppNotification = new AppNotification();
    const rate: number = registerRatingRequestDto.rate;
    if (rate == null){
      notification.addError('Rate is required', null);
    }
    if (rate <= 0 || rate >= 5){
      notification.addError('Rate must be between 0 and 5', null);
    }

    let id: number = registerRatingRequestDto.contractId;
    const contract: ContractTypeORM = await this.contractRepository.createQueryBuilder().where("id = :id", { id }).getOne();
    if(contract == null){
      notification.addError('Contract not found', null);
    }
    else{
      id = contract.contractor_id.value;
      const contractor: ContractorTypeORM = await this.contractorRepository.createQueryBuilder().where("id = :id", { id }).getOne();
      if(contractor == null){
        notification.addError('Contractor not found', null);
      }

      id = contract.employee_id.value;
      const employee: EmployeeTypeORM = await this.employeeRepository.createQueryBuilder().where("id = :id", { id }).getOne();
      if(employee == null){
        notification.addError('Employee not found', null);
      }
    }
    return notification;
  }
}