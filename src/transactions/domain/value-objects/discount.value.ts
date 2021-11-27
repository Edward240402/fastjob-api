import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class Discount {
  private readonly discount: number;

  private constructor(discount: number) {
    this.discount = discount;
  }

  public getDiscount(): number {
    return this.discount;
  }

  public static create(discount: number): Result<AppNotification, Discount> {
    let notification: AppNotification = new AppNotification();
    if (discount === 0) {
      notification.addError('Invalid amount, please enter a valid number', null);
    }
    return Result.ok(new Discount(discount));
  }
}