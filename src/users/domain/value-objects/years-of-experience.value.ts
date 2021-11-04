import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class YearsOfExperience{
  private readonly years: number;
  private static MAX_VALUE: number = 70;

  private constructor(years: number) {
    this.years = years;
  }

  public getYearsOfExperience(): number {
    return this.years;
  }

  public static create(years: number): Result<AppNotification, YearsOfExperience> {
    let notification: AppNotification = new AppNotification();
    if(years > this.MAX_VALUE) {
      notification.addError('The maximum value of Years of Experience is ' + this.MAX_VALUE, null);
    }
    if(notification.hasErrors()){
      return Result.error(notification);
    }
    return Result.ok(new YearsOfExperience(years));
  }
}