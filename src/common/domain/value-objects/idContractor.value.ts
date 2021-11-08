export class IdContractor {
  private value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static of(value: number): IdContractor {
    return new IdContractor(value);
  }
}