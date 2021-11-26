export class RegisterRatingResponseDto{
  constructor(
    public id: number,
    public readonly employeeId: number,
    public readonly rate: number
  ) {}
}