import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { RatingApplicationService } from "../application/services/rating-application.service";
import { QueryBus } from "@nestjs/cqrs";
import { RegisterRatingRequestDto } from "../application/dtos/request/register-rating-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../common/application/app.notification";
import { RegisterRatingResponseDto } from "../application/dtos/response/register-rating-response.dto";
import { ApiController } from "../../common/api/api.controller";
import { GetRatingQuery } from "../application/queries/get-rating.query";

@Controller('rating')
export class RatingController{
  constructor(
    private readonly ratingApplicationService: RatingApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async register(
    @Body() registerRatingRequestDto: RegisterRatingRequestDto,
    @Res({passthrough: true}) response
  ): Promise<object>{
    try {
      const result: Result<AppNotification, RegisterRatingResponseDto> = await this.ratingApplicationService.register(registerRatingRequestDto);
      if(result.isSuccess()){
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error){
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getRating(@Res({passthrough: true}) response): Promise<object>{
    try {
      const rating = await this.queryBus.execute(new GetRatingQuery());
      return ApiController.ok(response, rating);
    } catch (error){
      return ApiController.serverError(response, error);
    }
  }
}