import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Index } from "./application/services";
import { RegisterTransactionValidator } from "./application/validators/register-transaction.validator";
import { TransactionsController } from "./api/transactions.controller";
import { TransactionTypeorm } from "./infrastructure/persistence/typeorm/entities/transaction.typeorm";
import { RegisterTransactionHandler } from "./application/handlers/commands/register-transaction.handler";
import { TransactionRegisteredHandler } from "./application/handlers/events/transaction-registered.handler";
import { GetTransactionsHandler } from "./application/handlers/queries/get-transactions.handler";
import { UsersModule } from "../users/users.module";
import { EmployeeTypeORM } from "../users/infrastructure/persistence/typeorm/entities/employee.typeorm";
import { ContractorTypeORM } from "../users/infrastructure/persistence/typeorm/entities/contractorTypeORM";
//import { NotificationAccepted } from "./application/handlers/events/notification-accepted";
import { ContractTypeORM } from '../contracts/infrastructure/persistence/typeorm/entities/contract.typeorm';
import { ContractsModule } from '../contracts/contracts.module';

export const CommandHandlers = [RegisterTransactionHandler];
//export const EventHandlers = [TransactionRegisteredHandler, NotificationAccepted];
export const EventHandlers = [TransactionRegisteredHandler];
export const QueryHandlers = [GetTransactionsHandler];

@Module({
  imports: [
    CqrsModule,
    ContractsModule,
    UsersModule,
    TypeOrmModule.forFeature([TransactionTypeorm, ContractTypeORM, EmployeeTypeORM, ContractorTypeORM]),
  ],
  controllers: [TransactionsController],
  providers: [
    Index,
    RegisterTransactionValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class TransactionsModule {}