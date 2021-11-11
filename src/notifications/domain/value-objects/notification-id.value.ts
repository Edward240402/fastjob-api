export class NotificationsBaseId {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number) {
    return new NotificationsBaseId(value);
  }

  public getValue(): number {
    return this.value;
  }
}
