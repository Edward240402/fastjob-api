import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterNotificationUserValidator } from '../validators/register-notification.validator';
import { RegisterNotificationUsersRequestDto } from '../dtos/request/register-notification-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { RegisterNotificationUsersResponseDto } from '../dtos/response/register-notification-response.dto';
import { RegisterNotificationUsersCommand } from '../commands/register-notification.command';
@Injectable()
export class NotificationUsersApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerNotificationUserValidator: RegisterNotificationUserValidator
  ) {}

  async registerNotificationUser(
    registerNotificationUserRequestDto: RegisterNotificationUsersRequestDto
  ): Promise<Result<AppNotification, RegisterNotificationUsersResponseDto>> {
    const notification: AppNotification = await this.registerNotificationUserValidator.validate(registerNotificationUserRequestDto);

    if(notification.hasErrors()){
      return Result.error(notification);
    }

    const registerNotificationUserCommand: RegisterNotificationUsersCommand = new RegisterNotificationUsersCommand(
      registerNotificationUserRequestDto.employeeId,
      registerNotificationUserRequestDto.contractorId,
      registerNotificationUserRequestDto.postId,
      registerNotificationUserRequestDto.information,

    );

    const notificationUserId = await this.commandBus.execute(registerNotificationUserCommand);
    const registerNotificationUserResponseDto: RegisterNotificationUsersResponseDto = new RegisterNotificationUsersResponseDto(
      notificationUserId,
      registerNotificationUserRequestDto.employeeId,
      registerNotificationUserRequestDto.contractorId,
      registerNotificationUserRequestDto.postId,
      registerNotificationUserRequestDto.information,
    );
    return Result.ok(registerNotificationUserResponseDto);
  }
}



