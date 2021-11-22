import { RegisterNotificationCommand } from '../../commands/register-notification.command';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationTypeORM } from '../../../infrastructure/persistence/typeorm/entities/notification.typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { UserId } from '../../../../users/domain/value-objects/user-id.value';
import { Notification } from '../../../domain/entities/notification.entity';
import { NotificationState } from '../../../domain/value-objects/information.value';
import { NotificationMapper } from '../../mappers/notification.mapper';
import { NotificationId } from '../../../domain/value-objects/notification-id.value';
import { PostId } from '../../../../posts/domain/value-objects/post-id.value';

@CommandHandler(RegisterNotificationCommand)
export class RegisterNotificationHandler implements ICommandHandler<RegisterNotificationCommand> {
  constructor(
    @InjectRepository(NotificationTypeORM)
    private notificationRepository: Repository<NotificationTypeORM>,
    private publisher: EventPublisher
  ) {}

  async execute(command: RegisterNotificationCommand) {
    const stateResult: Result<AppNotification, NotificationState> = NotificationState.create(command.state);
    if(stateResult.isFailure()){
      return 0;
    }

    let notification: Notification = new Notification(NotificationId.create(0), UserId.create(command.employeeId),UserId.create(command.contractorId),PostId.create(command.postId),
      stateResult.value);
    let notificationTypeORM = NotificationMapper.toTypeORM(notification);
    notificationTypeORM = await this.notificationRepository.save(notificationTypeORM);
    if(notificationTypeORM == null){
      return 0;
    }

    const notificationId: number = Number(notificationTypeORM.id.value);
    notification.changeId(NotificationId.create(notificationId));
    notification = this.publisher.mergeObjectContext(notification);
    notification.register();
    notification.commit();
    return notificationId;
  }
}


