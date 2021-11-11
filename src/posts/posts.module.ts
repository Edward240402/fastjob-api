import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterPostHandler } from "./application/handlers/commands/register-post.handler";
import { PostRegisteredHandler } from "./application/handlers/events/post-registered.handler";
import { GetPostsHandler } from "./application/handlers/queries/get-posts.handler";
import { UsersModule } from "../users/users.module";
import { PostTypeORM } from "./infrastructure/persistence/typeorm/entities/post.typeorm";
import { EmployeeTypeORM } from "../users/infrastructure/persistence/typeorm/entities/employee.typeorm";
import { PostsController } from "./api/posts.controller";
import { PostsApplicationService } from "./application/services/posts-application.service";
import { RegisterPostValidator } from "./application/validators/register-post.validator";

export const CommandHandlers = [RegisterPostHandler];
export const EventHandlers = [PostRegisteredHandler];
export const QueryHandlers = [GetPostsHandler];

@Module({
  imports: [
    CqrsModule,
    UsersModule,
    TypeOrmModule.forFeature([PostTypeORM, EmployeeTypeORM]),
  ],
  controllers: [PostsController],
  providers: [
    PostsApplicationService,
    RegisterPostValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class PostsModule {}