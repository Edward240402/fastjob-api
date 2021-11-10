export class ContractRegisteredEvent{
  constructor(
    public readonly id: number,
    public readonly employeeId: number,
    public readonly contractorId: number,
    public readonly contractDate: string,
    public readonly agreedDate: string,
    public readonly jobType: string,
    public readonly state: string
  ) {}
}