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
    const notification: AppNotification = await this.registerNotificationValidator.validate(
      registerNotificationRequestDto,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
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

import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { RegisterNotificationValidator } from "../validators/register-notification.validator";
import { RegisterNotificationRequestDto } from "../dtos/request/register-notification-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { RegisterNotificationResponseDto } from "../dtos/response/register-notification-response.dto";
import { RegisterNotificationCommand } from "../commands/register-notification.command";


@Injectable()
export class NotificationsApplicationService{
  constructor(
    private commandBus: CommandBus,
    private registerNotificationValidator: RegisterNotificationValidator
  ) {}

  async registerNotification(
    registerNotificationRequestDto: RegisterNotificationRequestDto
  ): Promise<Result<AppNotification, RegisterNotificationResponseDto>> {
    const notification: AppNotification = await this.registerNotificationValidator.validateNotification(registerNotificationRequestDto);

    if(notification.hasErrors()){
      return Result.error(notification);
    }

    const registerNotificationCommand: RegisterNotificationCommand = new RegisterNotificationCommand(
      registerNotificationRequestDto.idContractor,
      registerNotificationRequestDto.idEmployee

    );

    const notificationbaseId = await this.commandBus.execute(registerNotificationCommand);
    const registerNotificationResponseDto: RegisterNotificationResponseDto = new RegisterNotificationResponseDto(
      notificationbaseId,
      registerNotificationRequestDto.idContractor,
      registerNotificationRequestDto.idEmployee
    );
    return Result.ok(registerNotificationResponseDto);
  }

}