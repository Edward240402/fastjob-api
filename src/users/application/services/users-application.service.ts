import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { RegisterUserValidator } from "../validators/register-user.validator";
import { RegisterContractorRequestDto } from "../dtos/request/register-contractor-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { RegisterContractorResponseDto } from "../dtos/response/register-contractor-response.dto";
import { RegisterContractorCommand } from "../commands/register-contractor.command";
import { RegisterEmployeeRequestDto } from "../dtos/request/register-employee-request.dto";
import { RegisterEmployeeResponseDto } from "../dtos/response/register-employee-response.dto";
import { RegisterEmployeeCommand } from "../commands/register-employee.command";
import { Availability } from "../../domain/enums/availability";

@Injectable()
export class UsersApplicationService{
  constructor(
    private commandBus: CommandBus,
    private registerUserValidator: RegisterUserValidator
  ) {}

  async registerContractor(
    registerContractorRequestDto: RegisterContractorRequestDto
  ): Promise<Result<AppNotification, RegisterContractorResponseDto>> {
    const notification: AppNotification = await this.registerUserValidator.validateContractor(registerContractorRequestDto);

    if(notification.hasErrors()){
      return Result.error(notification);
    }

    const registerContractorCommand: RegisterContractorCommand = new RegisterContractorCommand(
      registerContractorRequestDto.name,
      registerContractorRequestDto.email,
      registerContractorRequestDto.password,
      registerContractorRequestDto.age
    );

    const contractorId = await this.commandBus.execute(registerContractorCommand);
    const registerContractorResponseDto: RegisterContractorResponseDto = new RegisterContractorResponseDto(
      contractorId,
      registerContractorRequestDto.name,
      registerContractorRequestDto.email,
      registerContractorRequestDto.password,
      registerContractorRequestDto.age,
      0, 0
    );
    return Result.ok(registerContractorResponseDto);
  }

  async registerEmployee(
    registerEmployeeRequestDto: RegisterEmployeeRequestDto
  ): Promise<Result<AppNotification, RegisterEmployeeResponseDto>>{
    const notification: AppNotification = await this.registerUserValidator.validateEmployee(registerEmployeeRequestDto);

    if(notification.hasErrors()){
      return Result.error(notification);
    }

    const registerEmployeeCommand: RegisterEmployeeCommand = new RegisterEmployeeCommand(
      registerEmployeeRequestDto.name,
      registerEmployeeRequestDto.email,
      registerEmployeeRequestDto.password,
      registerEmployeeRequestDto.age,
      registerEmployeeRequestDto.yearsOfExperience,
      Availability.NONE,
      registerEmployeeRequestDto.typeOfAccount,
    );

    const employeeId = await this.commandBus.execute(registerEmployeeCommand);
    const registerEmployeeResponseDto: RegisterEmployeeResponseDto = new RegisterEmployeeResponseDto(
      employeeId,
      registerEmployeeRequestDto.name,
      registerEmployeeRequestDto.email,
      registerEmployeeRequestDto.password,
      registerEmployeeRequestDto.age,
      0, 0,
      registerEmployeeRequestDto.yearsOfExperience,
      Availability.NONE,
      registerEmployeeRequestDto.typeOfAccount,
    );
    return Result.ok(registerEmployeeResponseDto);
  }
}