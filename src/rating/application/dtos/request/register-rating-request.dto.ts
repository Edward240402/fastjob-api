export class RegisterRatingRequestDto{
  constructor(
    public readonly contractId: number,
    public readonly rate: number
  ) {}
}