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
import { NotificationTypeORM } from "../../infrastructure/persistence/typeorm/entities/notification.typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { RegisterNotificationRequestDto } from "../dtos/request/register-notification-request.dto";
import { AppNotification } from "../../../common/application/app.notification";


@Injectable()
export class RegisterNotificationValidator {
  constructor(
    @InjectRepository(NotificationTypeORM)
    private notificationRepository: Repository<NotificationTypeORM>,

  ) {}

  public async validateNotification(registerNotificationRequestDto: RegisterNotificationRequestDto): Promise<AppNotification>{
    const notification: AppNotification = new AppNotification();

  /*  const name: string = registerNotificationRequestDto.name.trim();
    if(name.length <= 0){
      notification.addError('User name is required', null);
    }

    const email: string = registerNotificationRequestDto.email.trim();
    if(email.length <= 0){
      notification.addError('User email is required', null);
    }

    const password: string = registerNotificationRequestDto.password.trim();
    if(password.length <= 0){
      notification.addError('User password is required', null);
    }
    else if(password.length <= 7){
      notification.addError('User password must be at least 8 characters', null);
    }*/

    if(registerNotificationRequestDto.idEmployee <= 17){
      notification.addError('User must be at least 18 years old', null);
    }
    if(registerNotificationRequestDto.idContractor <= 17){
      notification.addError('User must be at least 18 years old', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const notificationBase: NotificationTypeORM = await this.notificationRepository.createQueryBuilder().getOne();
    if(notificationBase != null){
      notification.addError('User email is taken', null);
    }
    return notification;
  }
}