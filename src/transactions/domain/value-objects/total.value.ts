import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class Total {
  private readonly total: number;

  private constructor(total: number) {
    this.total = total;
  }

  public getTotal(): number {
    return this.total;
  }

  public static create(total: number): Result<AppNotification, Total> {
    let notification: AppNotification = new AppNotification();
    if (total === 0) {
      notification.addError('Invalid amount, please enter a valid number', null);
    }
    return Result.ok(new Total(total));
  }
}