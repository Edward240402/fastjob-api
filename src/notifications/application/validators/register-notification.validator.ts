import { Injectable } from '@nestjs/common';
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
}