import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { PostsApplicationService } from "../application/services/posts-application.service";
import { QueryBus } from "@nestjs/cqrs";
import { RegisterPostRequestDto } from "../application/dtos/request/register-post-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../common/application/app.notification";
import { RegisterPostResponseDto } from "../application/dtos/response/register-post-response.dto";
import { ApiController } from "../../common/api/api.controller";
import { GetPostsQuery } from "../application/queries/get-posts.query";

@Controller('posts')
export class PostsController{
  constructor(
    private readonly postsApplicationService: PostsApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async register(
    @Body() registerPostRequestDto: RegisterPostRequestDto,
    @Res({passthrough: true}) response
  ): Promise<object>{
    try {
      const result: Result<AppNotification, RegisterPostResponseDto> = await this.postsApplicationService.register(registerPostRequestDto);
      if(result.isSuccess()){
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error){
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getPosts(@Res({passthrough: true}) response): Promise<object>{
    try {
      const posts = await this.queryBus.execute(new GetPostsQuery());
      return ApiController.ok(response, posts);
    } catch (error){
      return ApiController.serverError(response, error)
    }
  }
}