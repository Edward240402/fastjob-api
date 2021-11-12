import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetNotificationUsersQuery } from "../../queries/get-notifications.query";
import { getManager } from "typeorm";
import { GetNotificationUsersDto } from "../../dtos/queries/get-notification.dto";

@QueryHandler(GetNotificationUsersQuery)
export class GetNotificationUserHandler implements IQueryHandler<GetNotificationUsersQuery>{
  constructor() {}

  async execute(query: GetNotificationUsersQuery){
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      idContractor,
      idEmployee
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
      notificationUserDto.idContractor = Number(ormNotificationUser.idEmployee);
      notificationUserDto.idEmployee = Number(ormNotificationUser.idContractor);
      return notificationUserDto;
    });
    return notificationUsers;
  }
}