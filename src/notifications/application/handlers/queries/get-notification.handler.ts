import { GetNotificationsQuery } from '../../queries/get-notifications.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetNotificationsDto } from '../../dtos/queries/get-notification.dto';

@QueryHandler(GetNotificationsQuery)
export class GetNotificationHandler implements IQueryHandler<GetNotificationsQuery> {
  constructor() {}

  async execute(query: GetNotificationsQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      idContractor,
      idEmployee,
      
    FROM 
      notifications
    ORDER BY
      id`;
    const ormNotifications = await manager.query(sql);
    if (ormNotifications.length <= 0) {
      return [];
    }
    const notifications: GetNotificationsDto[] = ormNotifications.map(function (ormNotification) {
      let notificationDto = new GetNotificationsDto();
      notificationDto.id = Number(ormNotification.id);
      notificationDto.idContractor = ormNotification.idContractor;
      notificationDto.idEmployee = ormNotification.idEmployee;
      return notificationDto;
    });
    return notifications;
  }
}
