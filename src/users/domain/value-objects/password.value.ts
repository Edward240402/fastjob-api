import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class Password{
  private readonly password: string;
  private static MAX_LENGTH: number = 25;
  private static MIN_LENGTH: number = 8;

  private constructor(password: string) {
    this.password = password;
  }

  public getPassword(): string {
    return this.password;
  }

  public static create(password: string): Result<AppNotification, Password> {
    let notification: AppNotification = new AppNotification();
    password = (password ?? "").trim();
    if(password === ""){
      notification.addError('Password is required', null);
    }
    if(password.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of a password is ' + this.MAX_LENGTH + ' characters', null);
    }
    if(password.length < this.MIN_LENGTH) {
      notification.addError('The minimum length of a password is ' + this.MIN_LENGTH + ' characters', null);
    }
    if(notification.hasErrors()){
      return Result.error(notification);
    }
    return Result.ok(new Password(password));
  }
}