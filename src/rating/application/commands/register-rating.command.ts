export class RegisterRatingCommand{
  constructor(
    public readonly contractId: number,
    public readonly rate: number
  ) {}
}