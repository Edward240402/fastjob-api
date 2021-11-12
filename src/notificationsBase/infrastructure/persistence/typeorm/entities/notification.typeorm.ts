import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { NotificationUserIdTypeORM } from './notification.id.typeorm';
import { IdContractorTypeORM } from './idContractor.typeorm';
import { IdEmployeeTypeORM } from './idEmployee.typeorm';
@Entity('notificationsUser')
@Unique('UQ_notificationsUser_id', ['id.value'])
export class NotificationUserTypeORM {
  @Column((type) => NotificationUserIdTypeORM, { prefix: false })
  public id: NotificationUserIdTypeORM;

  @Column((type) => IdContractorTypeORM, { prefix: false })
  public idContractor: IdContractorTypeORM;

  @Column((type) => IdEmployeeTypeORM, { prefix: false })
  public idEmployee: IdEmployeeTypeORM;
}