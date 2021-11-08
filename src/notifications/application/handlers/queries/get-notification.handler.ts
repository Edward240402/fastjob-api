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
      id_contractor as idContractor,
      id_employee as idEmployee,
      
    FROM 
      notifications
    ORDER BY
      idEmployee;`;
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