import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractsApplicationService } from "./application/services/contracts-application.service";
import { RegisterContractValidator } from "./application/validators/register-contract.validator";
import { ContractsController } from "./api/contracts.controller";
import { ContractTypeORM } from "./infrastructure/persistence/typeorm/entities/contract.typeorm";
import { RegisterContractHandler } from "./application/handlers/commands/register-contract.handler";
import { ContractRegisteredHandler } from "./application/handlers/events/contract-registered.handler";
import { GetContractsHandler } from "./application/handlers/queries/get-contracts.handler";
import { UsersModule } from "../users/users.module";
import { EmployeeTypeORM } from "../users/infrastructure/persistence/typeorm/entities/employee.typeorm";
import { ContractorTypeORM } from "../users/infrastructure/persistence/typeorm/entities/contractorTypeORM";

export const CommandHandlers = [RegisterContractHandler];
export const EventHandlers = [ContractRegisteredHandler];
export const QueryHandlers = [GetContractsHandler];

@Module({
  imports: [
    CqrsModule,
    UsersModule,
    TypeOrmModule.forFeature([ContractTypeORM, EmployeeTypeORM, ContractorTypeORM]),
  ],
  controllers: [ContractsController],
  providers: [
    ContractsApplicationService,
    RegisterContractValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class ContractsModule {}