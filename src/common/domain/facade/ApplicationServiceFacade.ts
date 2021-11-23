import { ContractsApplicationService } from "../../../contracts/application/services/contracts-application.service";
import { BoundedContext } from "../enums/bounded-context";
import { Result } from "typescript-result";
import { AppNotification } from "../../application/app.notification";
import { RegisterEntityResponseDto } from "../../application/dtos/response/register-entity-response.dto";
import { RegisterEntityRequestDto } from "../../application/dtos/request/register-entity-request.dto";

export class ApplicationServiceFacade{
  protected readonly contractsApplicationService: ContractsApplicationService

  constructor(contractsApplicationService: ContractsApplicationService = null) {
    this.contractsApplicationService = contractsApplicationService;
  }

  public async register(boundedContext: BoundedContext, registerEntityRequestDto: RegisterEntityRequestDto): Promise<Result<AppNotification, RegisterEntityResponseDto>>{
    switch (boundedContext){
      case BoundedContext.CONTRACT: return await this.contractsApplicationService.register(registerEntityRequestDto);
    }
  }
}