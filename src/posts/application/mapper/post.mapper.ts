import { Post } from "../../domain/entities/post.entity";
import { PostTypeORM } from "../../infrastructure/persistence/typeorm/entities/post.typeorm";
import { PostIdTypeORM } from "../../infrastructure/persistence/typeorm/entities/post.id.typeorm";
import { EmployeeIdTypeorm } from "../../../common/infrastructure/persistence/typeorm/entities/employee-id.typeorm";
import { PublishDateTypeORM } from "../../infrastructure/persistence/typeorm/entities/publish-date.typeorm";
import { ImageUrlTypeORM } from "../../infrastructure/persistence/typeorm/entities/image-url.typeorm";
import { TextTypeORM } from "../../infrastructure/persistence/typeorm/entities/text.typeorm";
import { JobTypeORM } from "../../../common/infrastructure/persistence/typeorm/entities/job.typeorm";

export class PostMapper {
  public static toTypeORM(post: Post): PostTypeORM {
    const postTypeORM: PostTypeORM = new PostTypeORM();
    postTypeORM.id = PostIdTypeORM.from(post.getId().getValue());
    postTypeORM.employee_id = EmployeeIdTypeorm.from(post.getEmployeeId().getValue());
    postTypeORM.publish_date = PublishDateTypeORM.from(post.getPublishDate().getDate());
    postTypeORM.image_url = ImageUrlTypeORM.from(post.getImageUrl().getImageUrl());
    postTypeORM.text = TextTypeORM.from(post.getText().getText());
    postTypeORM.job_type = JobTypeORM.from(post.getJobType().getJobType());
    return postTypeORM;
  }
}