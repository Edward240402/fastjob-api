export class NotificationUsersId {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number) {
    return new NotificationUsersId(value);
  }

  public getValue(): number {
    return this.value;
  }
}
