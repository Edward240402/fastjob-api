import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { TransactionsApplicationService } from "../application/services/transactions-application.service";
import { QueryBus } from "@nestjs/cqrs";
import { RegisterTransactionRequestDto } from "../application/dtos/request/register-transaction-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../common/application/app.notification";
import { RegisterTransactionResponseDto } from "../application/dtos/response/register-transaction-response.dto";
import { ApiController } from "../../common/api/api.controller";
import { GetTransactionQuery } from "../application/queries/get-transaction.query";

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionApplicationService: TransactionsApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async register(
    @Body() registerTransactionRequestDto: RegisterTransactionRequestDto,
    @Res({passthrough: true}) response
  ): Promise<object>{
    try {
      const result: Result<AppNotification, RegisterTransactionResponseDto> = await this.transactionApplicationService.register(registerTransactionRequestDto);
      if(result.isSuccess()){
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error){
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getTransaction(@Res({passthrough: true}) response): Promise<object>{
    try {
      const transactions = await this.queryBus.execute(new GetTransactionQuery());
      return ApiController.ok(response, transactions);
    } catch (error){
      return ApiController.serverError(response, error);
    }
  }
}