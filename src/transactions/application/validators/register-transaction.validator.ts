import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionTypeorm } from '../../infrastructure/persistence/typeorm/entities/transaction.typeorm';
import { Repository } from 'typeorm';
import { RegisterTransactionRequestDto } from '../dtos/request/register-transaction-request.dto';
import { AppNotification } from '../../../common/application/app.notification';
import { EmployeeTypeORM } from '../../../users/infrastructure/persistence/typeorm/entities/employee.typeorm';
import { ContractorTypeORM } from '../../../users/infrastructure/persistence/typeorm/entities/contractorTypeORM';
import { ContractTypeORM } from '../../../contracts/infrastructure/persistence/typeorm/entities/contract.typeorm';

@Injectable()
export class RegisterTransactionValidator {
  constructor(
    @InjectRepository(TransactionTypeorm)
    private contractRepository: Repository<TransactionTypeorm>,

    @InjectRepository(EmployeeTypeORM)
    private employeeRepository: Repository<EmployeeTypeORM>,

    @InjectRepository(ContractorTypeORM)
    private contractorRepository: Repository<ContractorTypeORM>
  ) {}

  public async validate(registerTransactionRequestDto: RegisterTransactionRequestDto): Promise<AppNotification>{
    let notification: AppNotification = new AppNotification();
    const typeOfAccount: string = registerTransactionRequestDto.typeOfAccount.trim();

    if(typeOfAccount.length <= 0){
      notification.addError('The type of account is required', null);
    }

    if(notification.hasErrors()){
      return notification;
    }

    let id: number = registerTransactionRequestDto.employeeId;
    const employee: EmployeeTypeORM = await this.employeeRepository.createQueryBuilder().where("employee_id = :id", { id }).getOne();
    if(employee == null){
      notification.addError('Employee not found', null);
    }

    id = registerTransactionRequestDto.contractorId;
    const contractor: ContractorTypeORM = await this.contractorRepository.createQueryBuilder().where('contractor_id = :id', { id }).getOne();
    if(contractor == null){
      notification.addError('Contractor not found', null);
    }

    return notification;
  }
}