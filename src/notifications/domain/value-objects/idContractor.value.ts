export class IdContractor {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number) {
    return new IdContractor(value);
  }

  public getValue(): number {
    return this.value;
  }
}