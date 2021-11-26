import { RegisterRatingHandler } from "./application/handlers/commands/register-rating.handler";
import { RatingRegisteredHandler } from "./application/handlers/events/rating-registered.handler";
import { GetRatingHandler } from "./application/handlers/queries/get-rating.handler";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { UsersModule } from "../users/users.module";
import { ContractsModule } from "../contracts/contracts.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContractTypeORM } from "../contracts/infrastructure/persistence/typeorm/entities/contract.typeorm";
import { EmployeeTypeORM } from "../users/infrastructure/persistence/typeorm/entities/employee.typeorm";
import { ContractorTypeORM } from "../users/infrastructure/persistence/typeorm/entities/contractorTypeORM";
import { RatingTypeORM } from "./infrastructure/persistence/typeorm/entities/ratingTypeORM";
import { RatingController } from "./api/rating.controller";
import { RatingApplicationService } from "./application/services/rating-application.service";
import { RegisterRatingValidator } from "./application/validators/register-rating.validator";

export const CommandHandlers = [RegisterRatingHandler];
export const EventHandlers = [RatingRegisteredHandler];
export const QueryHandlers = [GetRatingHandler];

@Module({
  imports: [
    CqrsModule,
    UsersModule,
    ContractsModule,
    TypeOrmModule.forFeature([RatingTypeORM, EmployeeTypeORM, ContractorTypeORM, ContractTypeORM]),
  ],
  controllers: [RatingController],
  providers: [
    RatingApplicationService,
    RegisterRatingValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class RatingModule {}