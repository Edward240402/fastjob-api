/*import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterNotificationRequestDto } from '../dtos/request/register-notification-request.dto';
import { RegisterNotificationCommand } from '../commands/register-notification.command';
import { RegisterNotificationResponseDto } from '../dtos/response/register-notification-response.dto';
import { RegisterNotificationValidator } from '../validators/register-notification.validator';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';


@Injectable()
export class NotificationsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerNotificationValidator: RegisterNotificationValidator,
  ) {}

  async register(
    registerNotificationRequestDto: RegisterNotificationRequestDto,
  ): Promise<Result<AppNotification, RegisterNotificationResponseDto>> {
    const notificationError: AppNotification = await this.registerNotificationValidator.validate(
      registerNotificationRequestDto,
    );
    if (notificationError.hasErrors()) {
      return Result.error(notificationError);
    }
    const registerNotificationCommand: RegisterNotificationCommand = new RegisterNotificationCommand(
      registerNotificationRequestDto.idContractor,
      registerNotificationRequestDto.idEmployee,

    );
    const notificationId = await this.commandBus.execute(registerNotificationCommand);
    const registerNotificationResponseDto: RegisterNotificationResponseDto = new RegisterNotificationResponseDto(
      notificationId,
      registerNotificationRequestDto.idContractor,
      registerNotificationRequestDto.idEmployee,

    );
    return Result.ok(registerNotificationResponseDto);
  }
}*/