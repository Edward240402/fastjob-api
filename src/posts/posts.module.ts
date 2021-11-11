import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

export const CommandHandlers = [];
export const EventHandlers = [];
export const QueryHandlers = [];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([]),
  ],
  controllers: [],
  providers: [
    //UsersApplicationService,
    //RegisterUserValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class PostsModule {}