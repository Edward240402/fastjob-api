import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from "./api/users.controller";
import { ContractorTypeORM } from "./infrastructure/persistence/typeorm/entities/users/contractor/contractorTypeORM";
import { EmployeeTypeORM } from "./infrastructure/persistence/typeorm/entities/users/employee/employee.typeorm";
import { UsersApplicationService } from "./application/services/users-application.service";
import { RegisterUserValidator } from "./application/validators/register-user.validator";
import { RegisterContractorsHandler } from "./application/handlers/commands/register-contractors.handler";
import { RegisterEmployeeHandler } from "./application/handlers/commands/register-employee.handler";
import { ContractorRegisteredHandler } from "./application/handlers/events/contractor-registered.handler";
import { EmployeeRegisteredHandler } from "./application/handlers/events/employee-registered.handler";
import { GetContractorsHandler } from "./application/handlers/queries/get-contractors.handler";
import { GetEmployeesHandler } from "./application/handlers/queries/get-employees.handler";

export const CommandHandlers = [RegisterContractorsHandler, RegisterEmployeeHandler];
export const EventHandlers = [ContractorRegisteredHandler, EmployeeRegisteredHandler];
export const QueryHandlers = [GetContractorsHandler, GetEmployeesHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ContractorTypeORM, EmployeeTypeORM]),
  ],
  controllers: [UsersController],
  providers: [
    UsersApplicationService,
    RegisterUserValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class UsersModule {}