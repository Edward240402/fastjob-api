import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class TypeOfAccount {
  private readonly typeOfAccount: string;
  private static MAX_LENGTH: number = 50;

  private constructor(typeOfAccount: string) {
    this.typeOfAccount = typeOfAccount;
  }

  public getTypeOfAccount(): string {
    return this.typeOfAccount;
  }

  public static create(typeOfAccount: string): Result<AppNotification, TypeOfAccount> {
    let notification: AppNotification = new AppNotification();
    typeOfAccount = (typeOfAccount ?? "").trim();
    if(typeOfAccount === ""){
      notification.addError('The type of account is required', null);
    }
    if(typeOfAccount.length > this.MAX_LENGTH) {
      notification.addError('The maximum length  is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if(notification.hasErrors()){
      return Result.error(notification);
    }
    return Result.ok(new TypeOfAccount(typeOfAccount));
  }
}