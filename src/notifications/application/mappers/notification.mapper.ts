import { Notification } from '../../domain/entities/notification.entity';
import { NotificationTypeORM } from '../../infrastructure/persistence/typeorm/entities/notification.typeorm';
import { NotificationIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/notification.id.typeorm';
import { IdContractorTypeORM } from '../../infrastructure/persistence/typeorm/entities/idContractor.typeorm';
import { IdEmployeeTypeORM } from '../../infrastructure/persistence/typeorm/entities/idEmployee.typeorm';

export class NotificationMapper {
  public static toTypeORM(notification: Notification): NotificationTypeORM {
    const notificationTypeORM: NotificationTypeORM = new NotificationTypeORM();
    notificationTypeORM.id = NotificationIdTypeORM.from(notification.getId().getValue());
    notificationTypeORM.idContractor = IdContractorTypeORM.from(notification.getIdContractor().getIdContractor());
    notificationTypeORM.idEmployee = IdEmployeeTypeORM.from(notification.getIdEmployee().getIdEmployee());
    return notificationTypeORM;
  }
}