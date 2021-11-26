import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class Rate{
  private readonly rate: number;
  private static MAX_VALUE: number = 5;
  private static MIN_VALUE: number = 0;

  private constructor(rate: number) {
    this.rate = rate;
  }

  public getRate(): number {
    return this.rate;
  }

  public static create(rate: number): Result<AppNotification, Rate> {
    let notification: AppNotification = new AppNotification();
    if(rate > this.MAX_VALUE) {
      notification.addError('The maximum value of Rate is ' + this.MAX_VALUE, null);
    }
    if(rate < this.MIN_VALUE) {
      notification.addError('The minimum value of Rate is ' + this.MIN_VALUE, null);
    }
    if(notification.hasErrors()){
      return Result.error(notification);
    }
    return Result.ok(new Rate(rate));
  }
}