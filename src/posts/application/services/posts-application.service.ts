import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { RegisterPostValidator } from "../validators/register-post.validator";
import { RegisterPostRequestDto } from "../dtos/request/register-post-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { RegisterPostResponseDto } from "../dtos/response/register-post-response.dto";
import { RegisterPostCommand } from "../commands/register-post.command";
import * as moment from 'moment-timezone';

@Injectable()
export class PostsApplicationService{
  constructor(
    private commandBus: CommandBus,
    private registerPostValidator: RegisterPostValidator
  ) {}

  async register(registerPostRequestDto: RegisterPostRequestDto): Promise<Result<AppNotification, RegisterPostResponseDto>>{
    const notification: AppNotification = await this.registerPostValidator.validate(registerPostRequestDto);
    if(notification.hasErrors()){
      return Result.error(notification);
    }

    moment.tz.setDefault('UTC');
    const datetime = moment.tz().toDate();
    const registerPostCommand: RegisterPostCommand = new RegisterPostCommand(
      registerPostRequestDto.employeeId,
      datetime,
      registerPostRequestDto.imageUrl,
      registerPostRequestDto.text,
      registerPostRequestDto.jobType
    );

    const postId = await this.commandBus.execute(registerPostCommand);
    const registerPostResponseDto: RegisterPostResponseDto = new RegisterPostResponseDto(
      postId,
      registerPostRequestDto.employeeId,
      datetime.toString(),
      registerPostRequestDto.imageUrl,
      registerPostRequestDto.text,
      registerPostRequestDto.jobType
    );
    return Result.ok(registerPostResponseDto);
  }
}