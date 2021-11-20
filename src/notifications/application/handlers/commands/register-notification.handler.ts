import { RegisterNotificationUsersCommand } from '../../commands/register-notification.command';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationUserTypeORM } from '../../../infrastructure/persistence/typeorm/entities/notification.typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { UserId } from '../../../../users/domain/value-objects/user-id.value';
import { NotificationUser } from '../../../domain/entities/notification.entity';
import { Information } from '../../../domain/value-objects/information.value';
import { NotificationUserMapper } from '../../mappers/notification.mapper';
import { NotificationUsersId } from '../../../domain/value-objects/notification-id.value';
import { PostId } from '../../../../posts/domain/value-objects/post-id.value';

@CommandHandler(RegisterNotificationUsersCommand)
export class RegisterNotificationUserHandler implements ICommandHandler<RegisterNotificationUsersCommand> {
  constructor(
    @InjectRepository(NotificationUserTypeORM)
    private notificationUserRepository: Repository<NotificationUserTypeORM>,
    private publisher: EventPublisher
  ) {}

  async execute(command: RegisterNotificationUsersCommand) {

    const informationResult: Result<AppNotification, Information> = Information.create(command.information);
    if(informationResult.isFailure()){
      return 0;
    }

    let notificationUser: NotificationUser = new NotificationUser(NotificationUsersId.create(0), UserId.create(command.employeeId),UserId.create(command.contractorId),PostId.create(command.postId),
      informationResult.value);
    let notificationUserTypeORM = NotificationUserMapper.toTypeORM(notificationUser);
    notificationUserTypeORM = await this.notificationUserRepository.save(notificationUserTypeORM);
    if(notificationUserTypeORM == null){
      return 0;
    }

    const notificationUserId: number = Number(notificationUserTypeORM.id.value);
    notificationUser.changeId(NotificationUsersId.create(notificationUserId));
    notificationUser = this.publisher.mergeObjectContext(notificationUser);
    notificationUser.register();
    notificationUser.commit();
    return notificationUserId;
  }
}


