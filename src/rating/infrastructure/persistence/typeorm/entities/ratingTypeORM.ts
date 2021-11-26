import { Column, Entity } from "typeorm";
import { Unique } from "typeorm/browser";
import { RatingIdTypeORM } from "./rating.id.typeorm";
import { ContractIdTypeORM } from "../../../../../common/infrastructure/persistence/typeorm/entities/contract-id.typeorm";
import { RateTypeORM } from "../../../../../common/infrastructure/persistence/typeorm/entities/rate.typeorm";

@Entity('rating')
@Unique('UQ_rating_id', ['id.value'])
export class RatingTypeORM {
  @Column(type => RatingIdTypeORM, {prefix: false})
  public id: RatingIdTypeORM;

  @Column(type => ContractIdTypeORM, {prefix: false})
  public contract_id: ContractIdTypeORM;

  @Column(type => RateTypeORM, {prefix: false})
  public rate: RateTypeORM;
}