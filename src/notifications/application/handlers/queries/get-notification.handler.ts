import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetNotificationUsersQuery } from '../../queries/get-notifications.query';
import { getManager } from 'typeorm';
import { GetNotificationUsersDto } from '../../dtos/queries/get-notification.dto';

@QueryHandler(GetNotificationUsersQuery)
export class GetNotificationUserHandler implements IQueryHandler<GetNotificationUsersQuery>{
  constructor() {}

  async execute(query: GetNotificationUsersQuery){
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      employee_id,
      contractor_id,
      post_id,
      information
    FROM 
      notificationsUser
    ORDER BY
      id;`;

    const ormNotificationUsers = await manager.query(sql);
    if(ormNotificationUsers.length <= 0){
      return [];
    }

    const notificationUsers: GetNotificationUsersDto[] = ormNotificationUsers.map(function(ormNotificationUser) {
      let notificationUserDto = new GetNotificationUsersDto();
      notificationUserDto.id = Number(ormNotificationUser.id);
      notificationUserDto.employeeId = Number(ormNotificationUser.employeeId);
      notificationUserDto.contractorId = Number(ormNotificationUser.contractorId);
      notificationUserDto.postId = Number(ormNotificationUser.postId);
      notificationUserDto.information = ormNotificationUser.information;
      return notificationUserDto;
    });
    return notificationUsers;
  }
}