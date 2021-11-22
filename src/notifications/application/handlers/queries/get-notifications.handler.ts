import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetNotificationsQuery } from '../../queries/get-notifications.query';
import { getManager } from 'typeorm';
import { GetNotificationsDto } from '../../dtos/queries/get-notification.dto';

@QueryHandler(GetNotificationsQuery)
export class GetNotificationsHandler implements IQueryHandler<GetNotificationsQuery>{
  constructor() {}

  async execute(query: GetNotificationsQuery){
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      employee_id,
      contractor_id,
      post_id,
      state
    FROM 
      notifications
    ORDER BY
      id;`;

    const ormNotification = await manager.query(sql);
    if(ormNotification.length <= 0){
      return [];
    }

    const notifications: GetNotificationsDto[] = ormNotification.map(function(ormNotification) {
      let notificationDto = new GetNotificationsDto();
      notificationDto.id = Number(ormNotification.id);
      notificationDto.employeeId = Number(ormNotification.employee_id);
      notificationDto.contractorId = Number(ormNotification.contractor_id);
      notificationDto.postId = Number(ormNotification.post_id);
      notificationDto.state = ormNotification.state;
      return notificationDto;
    });
    return notifications;
  }
}