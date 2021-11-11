import { Result } from "typescript-result";
import { AppNotification } from "../../application/app.notification";

export class JobType{
  private readonly jobType: string;
  private static MAX_LENGTH: number = 50;

  private constructor(jobType: string) {
    this.jobType = jobType;
  }

  public getJobType(): string {
    return this.jobType;
  }

  public static create(jobType: string): Result<AppNotification, JobType> {
    let notification: AppNotification = new AppNotification();
    jobType = (jobType ?? "").trim();
    if(jobType === ""){
      notification.addError('Job Type is required', null);
    }
    if(jobType.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of a Job Type is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if(notification.hasErrors()){
      return Result.error(notification);
    }
    return Result.ok(new JobType(jobType));
  }
}