/*export class IdContractor {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number) {
    return new IdContractor(value);
  }

  public getValue(): number {
    return this.value;
  }
}*/


import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class IdContractor{
  private readonly idContractor: number;
  private static MAX_VALUE: number = 100;
  private static MIN_VALUE: number = 18;

  private constructor(idContractor: number) {
    this.idContractor = idContractor;
  }

  public getIdContractor(): number {
    return this.idContractor;
  }

  public static create(idContractor: number): Result<AppNotification, IdContractor> {
    let notification: AppNotification = new AppNotification();
    if(idContractor > this.MAX_VALUE) {
      notification.addError('The maximum value of Age is ' + this.MAX_VALUE, null);
    }
    if(idContractor < this.MIN_VALUE) {
      notification.addError('The minimum value of Age is ' + this.MIN_VALUE, null);
    }
    if(notification.hasErrors()){
      return Result.error(notification);
    }
    return Result.ok(new IdContractor(idContractor));
  }
}


