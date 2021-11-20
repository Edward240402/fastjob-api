import { NotificationUser } from '../../domain/entities/notification.entity';
import { NotificationUserTypeORM } from '../../infrastructure/persistence/typeorm/entities/notification.typeorm';
import { NotificationUserIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/notification.id.typeorm';
import { InformationTypeORM } from '../../infrastructure/persistence/typeorm/entities/information.typeorm';
import { ContractorIdTypeorm } from '../../../common/infrastructure/persistence/typeorm/entities/contractor-id.typeorm';
import { EmployeeIdTypeorm } from '../../../common/infrastructure/persistence/typeorm/entities/employee-id.typeorm';
import { PostIdTypeorm } from '../../../common/infrastructure/persistence/typeorm/entities/post-id.typeorm';

export class NotificationUserMapper{
  public static toTypeORM(notificationUser:NotificationUser ): NotificationUserTypeORM{
    const notificationUserTypeORM: NotificationUserTypeORM = new NotificationUserTypeORM();
    notificationUserTypeORM.id = NotificationUserIdTypeORM.from(notificationUser.getId().getValue());
    notificationUserTypeORM.employee_id = EmployeeIdTypeorm.from(notificationUser.getEmployeeId().getValue());
    notificationUserTypeORM.contractor_id = ContractorIdTypeorm.from(notificationUser.getContractorId().getValue());
    notificationUserTypeORM.post_id = PostIdTypeorm.from(notificationUser.getPostId().getValue());
    notificationUserTypeORM.information = InformationTypeORM.from(notificationUser.getInformation().getInformation());
    return notificationUserTypeORM;
  }
}