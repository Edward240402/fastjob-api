import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class Payment {
  private readonly payment: number;

  private constructor(payment: number) {
    this.payment = payment;
  }

  public getPayment(): number {
    return this.payment;
  }

  public static create(payment: number): Result<AppNotification, Payment> {
    let notification: AppNotification = new AppNotification();
    if (payment === 0) {
      notification.addError('Invalid amount, please enter a valid number ', null);
    }
    return Result.ok(new Payment(payment));
  }
}