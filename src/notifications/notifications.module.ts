import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsController } from './api/notification.controller';
import { NotificationTypeORM } from './infrastructure/persistence/typeorm/entities/notification.typeorm';
import { NotificationsApplicationService } from './application/services/notifications-application.service';
import { RegisterNotificationValidator } from './application/validators/register-notification.validator';
import { RegisterNotificationHandler } from './application/handlers/commands/register-notification.handler';
import { NotificationRegisteredHandler } from './application/handlers/events/notification-registered.handler';
import { GetNotificationsHandler } from './application/handlers/queries/get-notifications.handler';
import { UsersModule } from "../users/users.module";
import { PostsModule } from "../posts/posts.module";
import { EmployeeTypeORM } from "../users/infrastructure/persistence/typeorm/entities/employee.typeorm";
import { ContractorTypeORM } from "../users/infrastructure/persistence/typeorm/entities/contractorTypeORM";
import { PostTypeORM } from "../posts/infrastructure/persistence/typeorm/entities/post.typeorm";


export const CommandHandlers = [RegisterNotificationHandler];
export const EventHandlers = [NotificationRegisteredHandler];
export const QueryHandlers = [GetNotificationsHandler];

@Module({
  imports: [
    CqrsModule,
    UsersModule,
    PostsModule,
    TypeOrmModule.forFeature([NotificationTypeORM, EmployeeTypeORM, ContractorTypeORM, PostTypeORM]),
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