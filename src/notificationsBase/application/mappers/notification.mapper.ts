import { NotificationUser } from '../../domain/entities/notification.entity';
import { NotificationUserTypeORM } from '../../infrastructure/persistence/typeorm/entities/notification.typeorm';
import { NotificationUserIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/notification.id.typeorm';
import { IdContractorTypeORM } from '../../infrastructure/persistence/typeorm/entities/idContractor.typeorm';
import { IdEmployeeTypeORM } from '../../infrastructure/persistence/typeorm/entities/idEmployee.typeorm';



export class NotificationUserMapper{
  public static toTypeORM(notificationUser:NotificationUser ): NotificationUserTypeORM{
    const notificationUserTypeORM: NotificationUserTypeORM = new NotificationUserTypeORM();
    notificationUserTypeORM.id = NotificationUserIdTypeORM.from(notificationUser.getId().getValue());
    notificationUserTypeORM.idContractor = IdContractorTypeORM.from(notificationUser.getIdContractor().getIdContractor());
    notificationUserTypeORM.idEmployee = IdEmployeeTypeORM.from(notificationUser.getIdEmployee().getIdEmployee());
    return notificationUserTypeORM;
  }
}