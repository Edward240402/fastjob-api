import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationUserController } from './api/notification.controller';
import { NotificationUserTypeORM } from './infrastructure/persistence/typeorm/entities/notification.typeorm';
import { NotificationUsersApplicationService } from './application/services/notifications-application.service';
import { RegisterNotificationUserValidator } from './application/validators/register-notification.validator';
import { RegisterNotificationUserHandler } from './application/handlers/commands/register-notification.handler';
import { NotificationUserRegisteredHandler } from './application/handlers/events/notification-registered.handler';
import { GetNotificationUserHandler } from './application/handlers/queries/get-notification.handler';


export const CommandHandlers = [RegisterNotificationUserHandler];
export const EventHandlers = [NotificationUserRegisteredHandler];
export const QueryHandlers = [GetNotificationUserHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([NotificationUserTypeORM]),
  ],
  controllers: [NotificationUserController],
  providers: [
    NotificationUsersApplicationService,
    RegisterNotificationUserValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class NotificationUsersModule {}