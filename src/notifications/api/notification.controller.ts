import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { NotificationUsersApplicationService } from '../application/services/notifications-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterNotificationUsersRequestDto } from '../application/dtos/request/register-notification-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { RegisterNotificationUsersResponseDto } from '../application/dtos/response/register-notification-response.dto';
import { ApiController } from '../../common/api/api.controller';
import { GetNotificationUsersQuery } from '../application/queries/get-notifications.query';

@Controller('notificationsUser')
export class NotificationUserController {
  constructor(
    private readonly notificationUsersApplicationService: NotificationUsersApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async register(
    @Body() registerNotificationsUserRequestDto: RegisterNotificationUsersRequestDto,
    @Res({passthrough: true}) response
  ): Promise<object>{
    try {
      const result: Result<AppNotification, RegisterNotificationUsersResponseDto> = await this.notificationUsersApplicationService.registerNotificationUser(registerNotificationsUserRequestDto);
      if(result.isSuccess()){
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error){
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getNotificationsUser(@Res({passthrough: true}) response): Promise<object>{
    try {
      const notificationsUser = await this.queryBus.execute(new GetNotificationUsersQuery());
      return ApiController.ok(response, notificationsUser);
    } catch (error){
      return ApiController.serverError(response, error);
    }
  }
}