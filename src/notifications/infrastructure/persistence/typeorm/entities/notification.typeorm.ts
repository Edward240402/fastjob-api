import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { NotificationIdTypeORM } from './notification.id.typeorm';
import { IdContractorTypeORM } from './idContractor.typeorm';
import { IdEmployeeTypeORM } from './idEmployee.typeorm';
@Entity('notifications')
@Unique('UQ_notifications_id', ['id.value'])
export class NotificationTypeORM {
  @Column((type) => NotificationIdTypeORM, { prefix: false })
  public id: NotificationIdTypeORM;

  @Column((type) => IdContractorTypeORM, { prefix: false })
  public idContractor: IdContractorTypeORM;

  @Column((type) => IdEmployeeTypeORM, { prefix: false })
  public idEmployee: IdEmployeeTypeORM;
}