import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Notification } from '../domain/notification';
import { NotificationSchema } from '../infrastructure/persistence/typeorm/schemas/notification.schema';

@Injectable()
export class NotificationService {
  async  testNotification(): Promise<void> {
    const notificationDto = {
      idContractor: '123',
      idEmployee: '545',

    };
    const notificationRepository = getRepository<Notification>(NotificationSchema);
    await notificationRepository.insert(notificationDto);
  }


}
