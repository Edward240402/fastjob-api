import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class State{
  private readonly state: string;
  private static MAX_LENGTH: number = 50;

  private constructor(state: string) {
    this.state = state;
  }

  public getState(): string {
    return this.state;
  }

  public static create(state: string): Result<AppNotification, State> {
    let notification: AppNotification = new AppNotification();
    state = (state ?? "").trim();
    if(state === ""){
      notification.addError('Job Type is required', null);
    }
    if(state.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of a State is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if(notification.hasErrors()){
      return Result.error(notification);
    }
    return Result.ok(new State(state));
  }
}