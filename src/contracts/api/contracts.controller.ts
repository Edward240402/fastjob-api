import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { ContractsApplicationService } from "../application/services/contracts-application.service";
import { QueryBus } from "@nestjs/cqrs";
import { RegisterContractRequestDto } from "../application/dtos/request/register-contract-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../common/application/app.notification";
import { RegisterContractResponseDto } from "../application/dtos/response/register-contract-response.dto";
import { ApiController } from "../../common/api/api.controller";
import { GetContractsQuery } from "../application/quieries/get-contracts.query";

@Controller('contracts')
export class ContractsController {
  constructor(
    private readonly contractsApplicationService: ContractsApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async register(
    @Body() registerContractRequestDto: RegisterContractRequestDto,
    @Res({passthrough: true}) response
  ): Promise<object>{
    try {
      const result: Result<AppNotification, RegisterContractResponseDto> = await this.contractsApplicationService.register(registerContractRequestDto);
      if(result.isSuccess()){
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error){
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getContracts(@Res({passthrough: true}) response): Promise<object>{
    try {
      const contracts = await this.queryBus.execute(new GetContractsQuery());
      return ApiController.ok(response, contracts);
    } catch (error){
      return ApiController.serverError(response, error);
    }
  }
}