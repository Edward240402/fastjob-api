export class RatingRegisteredEvent{
  constructor(
    public readonly id: number,
    public readonly contractId: number,
    public readonly rate: number
  ) {}
}