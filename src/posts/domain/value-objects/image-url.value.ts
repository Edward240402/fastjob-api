import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class ImageUrl{
  private readonly image: string;
  private static MAX_LENGTH: number = 1000;

  private constructor(image: string) {
    this.image = image;
  }

  public getImageUrl(): string {
    return this.image;
  }

  public static create(image: string): Result<AppNotification, ImageUrl> {
    let notification: AppNotification = new AppNotification();
    image = (image ?? "").trim();
    if(image === ""){
      notification.addError('Post Image is required', null);
    }
    if(image.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of a Image Url is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if(notification.hasErrors()){
      return Result.error(notification);
    }
    return Result.ok(new ImageUrl(image));
  }
}