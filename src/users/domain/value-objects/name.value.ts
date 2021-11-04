import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class Name{
  private readonly name: string;
  private static MAX_LENGTH: number = 50;

  private constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public static create(name: string): Result<AppNotification, Name> {
    let notification: AppNotification = new AppNotification();
    name = (name ?? "").trim();
    if(name === ""){
      notification.addError('Name is required', null);
    }
    if(name.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of a Name is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if(notification.hasErrors()){
      return Result.error(notification);
    }
    return Result.ok(new Name(name));
  }
}