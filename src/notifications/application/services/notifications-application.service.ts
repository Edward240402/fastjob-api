import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterNotificationValidator } from '../validators/register-notification.validator';
import { RegisterNotificationRequestDto } from '../dtos/request/register-notification-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { RegisterNotificationResponseDto } from '../dtos/response/register-notification-response.dto';
import { RegisterNotificationCommand } from '../commands/register-notification.command';
@Injectable()
export class NotificationsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerNotificationValidator: RegisterNotificationValidator
  ) {}

  async register(registerNotificationRequestDto: RegisterNotificationRequestDto): Promise<Result<AppNotification, RegisterNotificationResponseDto>> {
    const notification: AppNotification = await this.registerNotificationValidator.validate(registerNotificationRequestDto);

    if(notification.hasErrors()){
      return Result.error(notification);
    }

    const registerNotificationCommand: RegisterNotificationCommand = new RegisterNotificationCommand(
      registerNotificationRequestDto.employeeId,
      registerNotificationRequestDto.contractorId,
      registerNotificationRequestDto.postId,
      registerNotificationRequestDto.state,
    );

    const notificationId = await this.commandBus.execute(registerNotificationCommand);
    const registerNotificationResponseDto: RegisterNotificationResponseDto = new RegisterNotificationResponseDto(
      notificationId,
      registerNotificationRequestDto.employeeId,
      registerNotificationRequestDto.contractorId,
      registerNotificationRequestDto.postId,
      registerNotificationRequestDto.state,
    );
    return Result.ok(registerNotificationResponseDto);
  }
}



