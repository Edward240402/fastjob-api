import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContractsModule } from "./contracts/contracts.module";
import { PostsModule } from "./posts/posts.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { RatingModule } from "./rating/rating.module";

@Module({
  imports: [UsersModule, NotificationsModule, ContractsModule, PostsModule, RatingModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
