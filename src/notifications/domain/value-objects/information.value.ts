import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class Information {
  private readonly information: string;
  private static MAX_LENGTH: number = 50;

  private constructor(information: string) {
    this.information = information;
  }

  public getInformation(): string {
    return this.information;
  }

  public static create(information: string): Result<AppNotification, Information> {
    let notification: AppNotification = new AppNotification();
    information = (information ?? "").trim();
    if(information === ""){
      notification.addError('The information is required', null);
    }
    if(information.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of a information is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if(notification.hasErrors()){
      return Result.error(notification);
    }
    return Result.ok(new Information(information));
  }
}