import { Notification } from '../../domain/entities/notification.entity';
import { NotificationTypeORM } from '../../infrastructure/persistence/typeorm/entities/notification.typeorm';
import { NotificationIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/notification.id.typeorm';
import { StateTypeORM } from '../../infrastructure/persistence/typeorm/entities/stateTypeORM';
import { ContractorIdTypeorm } from '../../../common/infrastructure/persistence/typeorm/entities/contractor-id.typeorm';
import { EmployeeIdTypeorm } from '../../../common/infrastructure/persistence/typeorm/entities/employee-id.typeorm';
import { PostIdTypeorm } from '../../../common/infrastructure/persistence/typeorm/entities/post-id.typeorm';

export class NotificationMapper {
  public static toTypeORM(notification:Notification ): NotificationTypeORM{
    const notificationTypeORM: NotificationTypeORM = new NotificationTypeORM();
    notificationTypeORM.id = NotificationIdTypeORM.from(notification.getId().getValue());
    notificationTypeORM.employee_id = EmployeeIdTypeorm.from(notification.getEmployeeId().getValue());
    notificationTypeORM.contractor_id = ContractorIdTypeorm.from(notification.getContractorId().getValue());
    notificationTypeORM.post_id = PostIdTypeorm.from(notification.getPostId().getValue());
    notificationTypeORM.state = StateTypeORM.from(notification.getState().getState());
    return notificationTypeORM;
  }
}