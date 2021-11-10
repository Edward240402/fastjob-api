import { RegisterNotificationCommand } from '../../commands/register-notification.command';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationTypeORM } from '../../../infrastructure/persistence/typeorm/entities/notification.typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { IdContractor } from '../../../domain/value-objects/idContractor.value';
import { IdEmployee } from '../../../domain/value-objects/idEmployee.value';
import { Notification } from 'src/notifications/domain/entities/notification.entity';
import { NotificationMapper } from '../../mappers/notification.mapper';
import { NotificationsBaseId } from '../../../domain/value-objects/notification-id.value';

@CommandHandler(RegisterNotificationCommand)
export class RegisterNotificationHandler implements ICommandHandler<RegisterNotificationCommand> {
  constructor(
    @InjectRepository(NotificationTypeORM)
    private notificationRepository: Repository<NotificationTypeORM>,
    private publisher: EventPublisher
  ) {}

  async execute(command: RegisterNotificationCommand) {
    const idContractorResult: Result<AppNotification, IdContractor> = IdContractor.create(command.idContractor);
    if(idContractorResult.isFailure()){
      return 0;
    }
    const idEmployeeResult: Result<AppNotification, IdEmployee> = IdEmployee.create(command.idEmployee);
    if(idEmployeeResult.isFailure()){
      return 0;
    }


    let notification: Notification = new Notification(NotificationsBaseId.create(0), idContractorResult.value, idEmployeeResult.value);
    let notificationTypeORM = NotificationMapper.toTypeORM(notification);
    notificationTypeORM = await this.notificationRepository.save(notificationTypeORM);
    if(notificationTypeORM == null){
      return 0;
    }

    const notificationId: number = Number(notificationTypeORM.id.value);
    notification.changeId(NotificationsBaseId.create(notificationId));
    notification = this.publisher.mergeObjectContext(notification);
    notification.register();
    notification.commit();
    return notificationId;
  }
}

