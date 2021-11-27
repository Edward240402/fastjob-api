import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class TextPost{
  private readonly text: string;
  private static MAX_LENGTH: number = 1000;

  private constructor(text: string) {
    this.text = text;
  }

  public getText(): string {
    return this.text;
  }

  public static create(text: string): Result<AppNotification, TextPost> {
    let notification: AppNotification = new AppNotification();
    text = (text ?? "").trim();
    if(text === ""){
      notification.addError('Post Image is required', null);
    }
    if(text.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of a Image Url is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if(notification.hasErrors()){
      return Result.error(notification);
    }
    return Result.ok(new TextPost(text));
  }
}