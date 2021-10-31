import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerTypeORM } from './infrastructure/persistence/typeorm/entities/customer.typeorm';
import { UsersController } from "./api/users.controller";

//export const CommandHandlers = [RegisterCustomerHandler];
//export const EventHandlers = [CustomerRegisteredHandler];
//export const QueryHandlers = [GetCustomersHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CustomerTypeORM]),
  ],
  controllers: [UsersController],
  providers: [
    //CustomersApplicationService,
    //RegisterCustomerValidator,
    //...CommandHandlers,
    //...EventHandlers,
    //...QueryHandlers
  ]
})
export class UsersModule {}