import { AggregateRoot } from "@nestjs/cqrs";
import { PostId } from "../value-objects/post-id.value";
import { UserId } from "../../../users/domain/value-objects/user-id.value";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";
import { ImageUrl } from "../value-objects/image-url.value";
import { TextPost } from "../value-objects/text-post.value";
import { JobType } from "../../../common/domain/value-objects/job-type.value";
import { PostRegisteredEvent } from "../events/post-registered.event";

export class Post extends AggregateRoot {
  private id: PostId;
  private employeeId: UserId;
  private publishDate: DateTime;
  private imageUrl: ImageUrl;
  private text: TextPost;
  private jobType: JobType;


  constructor(id: PostId, employeeId: UserId, publishDate: DateTime, imageUrl: ImageUrl, text: TextPost, jobType: JobType) {
    super();
    this.id = id;
    this.employeeId = employeeId;
    this.publishDate = publishDate;
    this.imageUrl = imageUrl;
    this.text = text;
    this.jobType = jobType;
  }

  public register() {
    const event = new PostRegisteredEvent(
      this.id.getValue(),
      this.employeeId.getValue(),
      this.publishDate.getDate().toString(),
      this.imageUrl.getImageUrl(),
      this.text.getText(),
      this.jobType.getJobType());
    this.apply(event);
  }

  public changeId(id: PostId) {
    this.id = id;
  }

  public getId(): PostId {
    return this.id;
  }

  public getEmployeeId(): UserId {
    return this.employeeId;
  }

  public getPublishDate(): DateTime {
    return this.publishDate;
  }

  public getImageUrl(): ImageUrl {
    return this.imageUrl;
  }

  public getText(): TextPost {
    return this.text;
  }

  public getJobType(): JobType {
    return this.jobType;
  }
}