/*
export class IdEmployee {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number) {
    return new IdEmployee(value);
  }

  public getValue(): number {
    return this.value;
  }
}*/

import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class IdEmployee{
  private readonly idEmployee: number;
  private static MAX_VALUE: number = 100;
  private static MIN_VALUE: number = 18;

  private constructor(idEmployee: number) {
    this.idEmployee = idEmployee;
  }

  public getIdEmployee(): number {
    return this.idEmployee;
  }

  public static create(idEmployee: number): Result<AppNotification, IdEmployee> {
    let notification: AppNotification = new AppNotification();
    if(idEmployee > this.MAX_VALUE) {
      notification.addError('The maximum value of Age is ' + this.MAX_VALUE, null);
    }
    if(idEmployee < this.MIN_VALUE) {
      notification.addError('The minimum value of Age is ' + this.MIN_VALUE, null);
    }
    if(notification.hasErrors()){
      return Result.error(notification);
    }
    return Result.ok(new IdEmployee(idEmployee));
  }
}


