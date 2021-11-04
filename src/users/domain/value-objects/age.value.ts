import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class Age{
  private readonly age: number;
  private static MAX_VALUE: number = 100;
  private static MIN_VALUE: number = 18;

  private constructor(age: number) {
    this.age = age;
  }

  public getAge(): number {
    return this.age;
  }

  public static create(age: number): Result<AppNotification, Age> {
    let notification: AppNotification = new AppNotification();
    if(age > this.MAX_VALUE) {
      notification.addError('The maximum value of Age is ' + this.MAX_VALUE, null);
    }
    if(age < this.MIN_VALUE) {
      notification.addError('The minimum value of Age is ' + this.MIN_VALUE, null);
    }
    if(notification.hasErrors()){
      return Result.error(notification);
    }
    return Result.ok(new Age(age));
  }
}