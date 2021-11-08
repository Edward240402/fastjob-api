import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { NotificationIdTypeORM } from './notification.id.typeorm';
import { IdContractorTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/idContractor.typeorm';
import { IdEmployeeTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/idEmployee.typeorm';


@Entity('notifications')
@Unique('UQ_notifications_idEmployee', ['idEmployee.value'])
export class NotificationTypeORM {
  @Column((type) => NotificationIdTypeORM, { prefix: false })
  public id: NotificationIdTypeORM;

  @Column((type) => IdContractorTypeORM, { prefix: false })
  public idContractor: IdContractorTypeORM;

  @Column((type) => IdEmployeeTypeORM, { prefix: false })
  public idEmployee: IdEmployeeTypeORM;
}