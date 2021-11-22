import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { NotificationIdTypeORM } from './notification.id.typeorm';
import { PostIdTypeorm } from '../../../../../common/infrastructure/persistence/typeorm/entities/post-id.typeorm';
import { StateTypeORM } from './stateTypeORM';
import { EmployeeIdTypeorm } from '../../../../../common/infrastructure/persistence/typeorm/entities/employee-id.typeorm';
import { ContractorIdTypeorm } from '../../../../../common/infrastructure/persistence/typeorm/entities/contractor-id.typeorm';

@Entity('notifications')
@Unique('UQ_notifications_id', ['id.value'])
export class NotificationTypeORM {

  @Column(type => NotificationIdTypeORM, { prefix: false })
  public id: NotificationIdTypeORM;

  @Column(type => EmployeeIdTypeorm, { prefix: false })
  public employee_id: EmployeeIdTypeorm;

  @Column(type => ContractorIdTypeorm, { prefix: false })
  public contractor_id: ContractorIdTypeorm;

  @Column((type) => PostIdTypeorm, { prefix: false })
  public post_id: PostIdTypeorm;

  @Column((type) => StateTypeORM, { prefix: false })
  public state: StateTypeORM;

}