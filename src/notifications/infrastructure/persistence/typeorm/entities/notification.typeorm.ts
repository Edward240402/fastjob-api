import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { NotificationUserIdTypeORM } from './notification.id.typeorm';
import { PostIdTypeorm } from '../../../../../common/infrastructure/persistence/typeorm/entities/post-id.typeorm';
import { InformationTypeORM } from './information.typeorm';
import { EmployeeIdTypeorm } from '../../../../../common/infrastructure/persistence/typeorm/entities/employee-id.typeorm';
import { ContractorIdTypeorm } from '../../../../../common/infrastructure/persistence/typeorm/entities/contractor-id.typeorm';

@Entity('notificationsUser')
@Unique('UQ_notificationsUser_id', ['id.value'])
export class NotificationUserTypeORM {

  @Column(type => NotificationUserIdTypeORM, { prefix: false })
  public id: NotificationUserIdTypeORM;

  @Column(type => EmployeeIdTypeorm, { prefix: false })
  public employee_id: EmployeeIdTypeorm;

  @Column(type => ContractorIdTypeorm, { prefix: false })
  public contractor_id: ContractorIdTypeorm;

  @Column((type) => PostIdTypeorm, { prefix: false })
  public post_id: PostIdTypeorm;

  @Column((type) => InformationTypeORM, { prefix: false })
  public information: InformationTypeORM;

}