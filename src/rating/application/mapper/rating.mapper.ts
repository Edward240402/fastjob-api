import { Rating } from "../../domain/entities/rating.entity";
import { RatingTypeORM } from "../../infrastructure/persistence/typeorm/entities/ratingTypeORM";
import { RatingIdTypeORM } from "../../infrastructure/persistence/typeorm/entities/rating.id.typeorm";
import { ContractIdTypeORM } from "../../../common/infrastructure/persistence/typeorm/entities/contract-id.typeorm";
import { RateTypeORM } from "../../../common/infrastructure/persistence/typeorm/entities/rate.typeorm";

export class RatingMapper{
  public static toTypeORM(rating: Rating): RatingTypeORM{
    const ratingTypeORM: RatingTypeORM = new RatingTypeORM();
    ratingTypeORM.id = RatingIdTypeORM.from(rating.getId().getValue());
    ratingTypeORM.contract_id = ContractIdTypeORM.from(rating.getContractId().getValue());
    ratingTypeORM.rate = RateTypeORM.from(rating.getRate().getRate());
    return ratingTypeORM;
  }
}