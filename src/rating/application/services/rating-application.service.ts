import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { RegisterRatingValidator } from "../validators/register-rating.validator";
import { RegisterRatingRequestDto } from "../dtos/request/register-rating-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { RegisterRatingResponseDto } from "../dtos/response/register-rating-response.dto";
import { RegisterRatingCommand } from "../commands/register-rating.command";
import { InjectRepository } from "@nestjs/typeorm";
import { ContractTypeORM } from "../../../contracts/infrastructure/persistence/typeorm/entities/contract.typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RatingApplicationService{
  constructor(
    private commandBus: CommandBus,
    private registerRatingValidator: RegisterRatingValidator,
    @InjectRepository(ContractTypeORM)
    private contractRepository: Repository<ContractTypeORM>
  ) {}

  async register(registerRatingRequestDto: RegisterRatingRequestDto): Promise<Result<AppNotification, RegisterRatingResponseDto>>{
    const notification: AppNotification = await this.registerRatingValidator.validate(registerRatingRequestDto);
    if(notification.hasErrors()){
      return Result.error(notification);
    }

    const registerRatingCommand: RegisterRatingCommand = new RegisterRatingCommand(
      registerRatingRequestDto.contractId,
      registerRatingRequestDto.rate
    );

    const ratingId = await this.commandBus.execute(registerRatingCommand);
    const id = registerRatingRequestDto.contractId;
    const contract: ContractTypeORM = await this.contractRepository.createQueryBuilder().where("id = :id", { id }).getOne();
    const registerRatingResponseDto: RegisterRatingResponseDto = new RegisterRatingResponseDto(
      ratingId,
      contract.employee_id.value,
      registerRatingRequestDto.rate
    );
    return Result.ok(registerRatingResponseDto);
  }
}