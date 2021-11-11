import { Column, Entity, Unique } from "typeorm";
import { PostIdTypeORM } from "./post.id.typeorm";
import { EmployeeIdTypeorm } from "../../../../../common/infrastructure/persistence/typeorm/entities/employee-id.typeorm";
import { PublishDateTypeORM } from "./publish-date.typeorm";
import { ImageUrlTypeORM } from "./image-url.typeorm";
import { TextTypeORM } from "./text.typeorm";
import { JobTypeORM } from "../../../../../common/infrastructure/persistence/typeorm/entities/job.typeorm";

@Entity('posts')
@Unique('UQ_posts_id', ['id.value'])
export class PostTypeORM{
  @Column(type => PostIdTypeORM, {prefix: false})
  public id: PostIdTypeORM;

  @Column(type => EmployeeIdTypeorm, {prefix: false})
  public employee_id: EmployeeIdTypeorm;

  @Column(type => PublishDateTypeORM, {prefix: false})
  public publish_date: PublishDateTypeORM;

  @Column(type => ImageUrlTypeORM, {prefix: false})
  public image_url: ImageUrlTypeORM;

  @Column(type => TextTypeORM, {prefix: false})
  public text: TextTypeORM;

  @Column(type => JobTypeORM, {prefix: false})
  public job_type: JobTypeORM;
}