/*import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from '../../../../../banking-ddd-nest-master/src/common/application/app.notification';
import { RegisterNotificationRequestDto } from '../../../../../fastjob-api-feature-users/src/notifications/application/dtos/request/register-notification-request.dto';
import { Repository } from 'typeorm';
import { NotificationTypeORM } from '../../../../../fastjob-api-feature-users/src/notifications/infrastructure/persistence/typeorm/entities/notification.typeorm';

@Injectable()
export class RegisterNotificationValidator {
  constructor(
    @InjectRepository(NotificationTypeORM)
    private customerRepository: Repository<NotificationTypeORM>,
  ) {
  }

  public async validate(
    registerNotificationRequestDto: RegisterNotificationRequestDto,
  ): Promise<AppNotification> {
    let notificationError: AppNotification = new AppNotification();
    const idContractor: number = registerNotificationRequestDto.idContractor;
    if (idContractor < 0) {
      notificationError.addError('Notification idContractor is required', null);
    }

    const idEmployee: number = registerNotificationRequestDto.idEmployee;
    if (idEmployee < 0) {
      notificationError.addError('Notification idEmployee is required', null);
    }
    if (notificationError.hasErrors()) {
      return notificationError;
    }

    return notificationError;
  }
}*/

import { InjectRepository } from "@nestjs/typeorm";
import { NotificationUserTypeORM } from "../../infrastructure/persistence/typeorm/entities/notification.typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { RegisterNotificationUsersRequestDto } from "../dtos/request/register-notification-request.dto";
import { AppNotification } from "../../../common/application/app.notification";


@Injectable()
export class RegisterNotificationUserValidator {
  constructor(
    @InjectRepository(NotificationUserTypeORM)
    private notificationUserRepository: Repository<NotificationUserTypeORM>,

  ) {}

  public async validateNotificationUser(registerNotificationUserRequestDto: RegisterNotificationUsersRequestDto): Promise<AppNotification>{
    const notification: AppNotification = new AppNotification();


    if(registerNotificationUserRequestDto.idEmployee <0){
      notification.addError('User must be at least 18 years old', null);
    }
    if(registerNotificationUserRequestDto.idContractor <0){
      notification.addError('User must be at least 18 years old', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    /*const notificationUser: NotificationUserTypeORM = await this.notificationUserRepository.createQueryBuilder().getOne();
    if(notificationUser !=0){
      notification.addError('hola', null);
    }*/
    return notification;
  }
}


/*
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
}*/