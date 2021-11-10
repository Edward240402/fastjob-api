import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { RegisterContractValidator } from "../validators/register-contract.validator";
import { RegisterContractRequestDto } from "../dtos/request/register-contract-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { RegisterContractResponseDto } from "../dtos/response/register-contract-response.dto";
import { RegisterContractCommand } from "../commands/register-contract.command";
import * as moment from 'moment-timezone';

@Injectable()
export class ContractsApplicationService{
  constructor(
    private commandBus: CommandBus,
    private registerContractValidator: RegisterContractValidator
  ) {}

  async register(registerContractRequestDto: RegisterContractRequestDto): Promise<Result<AppNotification, RegisterContractResponseDto>>{
    const notification: AppNotification = await this.registerContractValidator.validate(registerContractRequestDto);
    if(notification.hasErrors()){
      return Result.error(notification);
    }

    moment.tz.setDefault('UTC');
    const datetime = moment.tz().toDate();

    const registerContractCommand: RegisterContractCommand = new RegisterContractCommand(
      registerContractRequestDto.employeeId,
      registerContractRequestDto.contractorId,
      datetime,
      registerContractRequestDto.jobType,
      "Accepted",
    );

    const contractId = await this.commandBus.execute(registerContractCommand);
    const registerContractResponseDto: RegisterContractResponseDto = new RegisterContractResponseDto(
      contractId,
      registerContractRequestDto.employeeId,
      registerContractRequestDto.contractorId,
      datetime.toString(),
      "No established",
      registerContractRequestDto.jobType,
      "Accepted"
    );
    return Result.ok(registerContractResponseDto);
  }
}