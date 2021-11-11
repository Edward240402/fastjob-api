import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RegisterPostCommand } from "../../commands/register-post.command";
import { InjectRepository } from "@nestjs/typeorm";
import { PostTypeORM } from "../../../infrastructure/persistence/typeorm/entities/post.typeorm";
import { Repository } from "typeorm";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";
import { JobType } from "../../../../common/domain/value-objects/job-type.value";
import { ImageUrl } from "../../../domain/value-objects/image-url.value";
import { TextPost } from "../../../domain/value-objects/text-post.value";
import { Post } from "../../../domain/entities/post.entity";
import { PostId } from "../../../domain/value-objects/post-id.value";
import { UserId } from "../../../../users/domain/value-objects/user-id.value";
import { PostMapper } from "../../mapper/post.mapper";

@CommandHandler(RegisterPostCommand)
export class RegisterPostHandler implements ICommandHandler<RegisterPostCommand>{
  constructor(
    @InjectRepository(PostTypeORM)
    private postRepository: Repository<PostTypeORM>,
    private publisher: EventPublisher
  ) {}

  async execute(command: RegisterPostCommand) {
    const publishDateResult: Result<AppNotification, DateTime> = DateTime.create(command.publishDate);
    if(publishDateResult.isFailure()){
      return 0;
    }

    const imageUrlResult: Result<AppNotification, ImageUrl> = ImageUrl.create(command.imageUrl);
    if(imageUrlResult.isFailure()){
      return 0;
    }

    const textResult: Result<AppNotification, TextPost> = TextPost.create(command.text);
    if(textResult.isFailure()){
      return 0;
    }

    const jobTypeResult: Result<AppNotification, JobType> = JobType.create(command.jobType);
    if(jobTypeResult.isFailure()){
      return 0;
    }
    
    let post: Post = new Post(PostId.create(0), UserId.create(command.employeeId), publishDateResult.value,
      imageUrlResult.value, textResult.value, jobTypeResult.value);
    let postTypeORM = PostMapper.toTypeORM(post);
    postTypeORM = await this.postRepository.save(postTypeORM);
    if(postTypeORM == null){
      return 0;
    }

    const postId: number = Number(postTypeORM.id.value);
    post.changeId(PostId.create(postId));
    post = this.publisher.mergeObjectContext(post);
    post.register();
    post.commit();
    return postId;
  }
}