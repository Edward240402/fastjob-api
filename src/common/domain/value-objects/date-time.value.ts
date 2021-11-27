import * as moment from 'moment-timezone';
import { Result } from "typescript-result";
import { AppNotification } from "../../application/app.notification";

export class DateTime {
  private readonly datetime: Date;

  private constructor(datetime: Date) {
    this.datetime = datetime;
  }

  public getDate(): Date {
    return this.datetime;
  }

  public static create(date: Date): Result<AppNotification, DateTime> {
    let notification: AppNotification = new AppNotification();
    if(notification.hasErrors()){
      return Result.error(notification);
    }
    return Result.ok(new DateTime(date));
  }
}