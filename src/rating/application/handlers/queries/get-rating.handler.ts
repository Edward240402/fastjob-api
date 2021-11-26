import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetRatingQuery } from "../../queries/get-rating.query";
import { getManager } from "typeorm";
import { GetRatingDto } from "../../dtos/queries/get-rating.dto";

@QueryHandler(GetRatingQuery)
export class GetRatingHandler implements IQueryHandler<GetRatingQuery>{
  constructor() {}

  async execute(query: GetRatingQuery){
    const manager = getManager();
    const sql = `
    SELECT
      id,
      contract_id,
      rate
    FROM
      rating
    ORDER BY
      id;`;

    const ormRating = await manager.query(sql);
    if(ormRating.length <= 0){
      return [];
    }

    const rating: GetRatingDto[] = ormRating.map(function(ormRating) {
      let ratingDto = new GetRatingDto();
      ratingDto.id = Number(ormRating.id);
      ratingDto.contractId = Number(ormRating.contract_id);
      ratingDto.rate = ormRating.rate;
      return ratingDto;
    });
    return rating;
  }
}