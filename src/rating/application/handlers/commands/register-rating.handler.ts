import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RegisterRatingCommand } from "../../commands/register-rating.command";
import { InjectRepository } from "@nestjs/typeorm";
import { RatingTypeORM } from "../../../infrastructure/persistence/typeorm/entities/ratingTypeORM";
import { Repository } from "typeorm";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { Rate } from "../../../domain/value-objects/rate.value";
import { Rating } from "../../../domain/entities/rating.entity";
import { RatingId } from "../../../domain/value-objects/rating-id.value";
import { ContractId } from "../../../../contracts/domain/value-objects/contract-id.value";
import { RatingMapper } from "../../mapper/rating.mapper";

@CommandHandler(RegisterRatingCommand)
export class RegisterRatingHandler implements ICommandHandler<RegisterRatingCommand>{
  constructor(
    @InjectRepository(RatingTypeORM)
    private ratingRepository: Repository<RatingTypeORM>,
    private publisher: EventPublisher
  ) {}

  async execute(command: RegisterRatingCommand){
    const rateResult: Result<AppNotification, Rate> = Rate.create(command.rate);
    if(rateResult.isFailure()){
      return 0;
    }

    let rating: Rating = new Rating(RatingId.create(0), ContractId.create(command.contractId), rateResult.value);
    let ratingTypeORM = RatingMapper.toTypeORM(rating);
    ratingTypeORM = await this.ratingRepository.save(ratingTypeORM);
    if(ratingTypeORM == null){
      return 0;
    }

    const ratingId: number = Number(ratingTypeORM.id.value);
    rating.changeId(RatingId.create(ratingId));
    rating = this.publisher.mergeObjectContext(rating);
    rating.register();
    rating.commit();
    return ratingId;
  }
}