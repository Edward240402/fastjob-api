export class RegisterContractCommand{
  constructor(
    public readonly employeeId: number,
    public readonly contractorId: number,
    public readonly contractDate: Date,
    public readonly jobType: string,
    public readonly state: string
  ) {}
}