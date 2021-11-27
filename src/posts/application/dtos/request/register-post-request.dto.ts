export class RegisterPostRequestDto{
  constructor(
    public readonly employeeId: number,
    public readonly imageUrl: string,
    public readonly text: string,
    public readonly jobType: string
  ) {}
}