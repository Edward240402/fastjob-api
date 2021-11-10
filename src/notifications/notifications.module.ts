import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsController } from "./api/notification.controller";
import { NotificationTypeORM } from "./infrastructure/persistence/typeorm/entities/notification.typeorm";
import { NotificationsApplicationService } from "./application/services/notifications-application.service";
import { RegisterNotificationValidator } from "./application/validators/register-notification.validator";
import { RegisterNotificationHandler } from "./application/handlers/commands/register-notification.handler";
import { NotificationRegisteredHandler } from "./application/handlers/events/notification-registered.handler";
import { GetNotificationHandler } from "./application/handlers/queries/get-notification.handler";


export const CommandHandlers = [RegisterNotificationHandler];
export const EventHandlers = [NotificationRegisteredHandler];
export const QueryHandlers = [GetNotificationHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([NotificationTypeORM]),
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationsApplicationService,
    RegisterNotificationValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class NotificationsModule {}