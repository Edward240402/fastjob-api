export class IdEmployee {
  private value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static of(value: number): IdEmployee {
    return new IdEmployee(value);
  }
}