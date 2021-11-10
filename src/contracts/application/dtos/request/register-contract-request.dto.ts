export class RegisterContractRequestDto{
  constructor(
    public readonly employeeId: number,
    public readonly contractorId: number,
    public readonly jobType: string
  ) {}
}