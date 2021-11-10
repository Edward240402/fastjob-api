import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { RegisterNotificationRequestDto } from '../application/dtos/request/register-notification-request.dto';
import { RegisterNotificationResponseDto } from '../application/dtos/response/register-notification-response.dto';
import { NotificationsApplicationService } from "../application/services/notifications-application.service";
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetNotificationsQuery } from '../application/queries/get-notifications.query';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsApplicationService: NotificationsApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post ('notifications')
  async register(
    @Body() registerNotificationRequestDto: RegisterNotificationRequestDto,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterNotificationResponseDto> = await this.notificationsApplicationService.registerNotification(registerNotificationRequestDto);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get ()
  async getNotifications(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const notifications = await this.queryBus.execute(new GetNotificationsQuery());
      return ApiController.ok(response, notifications);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}