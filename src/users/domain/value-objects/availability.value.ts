import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class Availability{
  private readonly availability: string;
  private static MAX_LENGTH: number = 50;

  private constructor(availability: string) {
    this.availability = availability;
  }

  public getAvailability(): string {
    return this.availability;
  }

  public static create(availability: string): Result<AppNotification, Availability> {
    let notification: AppNotification = new AppNotification();
    availability = (availability ?? "").trim();
    if(availability === ""){
      notification.addError('Availability is required', null);
    }
    if(availability.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of a Availability is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if(notification.hasErrors()){
      return Result.error(notification);
    }
    return Result.ok(new Availability(availability));
  }
}