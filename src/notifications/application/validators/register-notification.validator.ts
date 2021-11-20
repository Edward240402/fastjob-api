
import { NotificationUserTypeORM } from '../../infrastructure/persistence/typeorm/entities/notification.typeorm';
import { Repository } from 'typeorm';

import { RegisterNotificationUsersRequestDto } from '../dtos/request/register-notification-request.dto';
import { AppNotification } from '../../../common/application/app.notification';
import { EmployeeTypeORM } from '../../../users/infrastructure/persistence/typeorm/entities/employee.typeorm';
import { ContractorTypeORM } from '../../../users/infrastructure/persistence/typeorm/entities/contractorTypeORM';
import { PostTypeORM } from '../../../posts/infrastructure/persistence/typeorm/entities/post.typeorm'
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RegisterNotificationUserValidator {
  constructor(
    @InjectRepository(NotificationUserTypeORM)
    private notificationUserRepository: Repository<NotificationUserTypeORM>,
/*
    @InjectRepository(EmployeeTypeORM)
    private employeeRepository: Repository<EmployeeTypeORM>,

    @InjectRepository(ContractorTypeORM)
    private contractorRepository: Repository<ContractorTypeORM>,

    @InjectRepository(PostTypeORM)
    private postRepository: Repository<PostTypeORM>*/

  ) {}

  public async validate(registerNotificationUserRequestDto: RegisterNotificationUsersRequestDto): Promise<AppNotification>{
    const notification: AppNotification = new AppNotification();


    const information: string = registerNotificationUserRequestDto.information.trim();
    if (information.length <= 0){
      notification.addError('Information is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    return notification;
  }
}
