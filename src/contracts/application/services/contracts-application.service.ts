import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { RegisterContractValidator } from "../validators/register-contract.validator";
import { RegisterContractRequestDto } from "../dtos/request/register-contract-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

@Injectable()
export class ContractsApplicationService{
  constructor(
    private commandBus: CommandBus,
    private registerContractValidator: RegisterContractValidator
  ) {}

  //TODO: Implement Response
  async register(registerContractRequestDto: RegisterContractRequestDto): Promise<Result<AppNotification, >>
}