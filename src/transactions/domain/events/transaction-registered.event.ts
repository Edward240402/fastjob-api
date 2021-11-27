export class TransactionRegisteredEvent {
  constructor(
    public readonly id: number,
    public readonly contractId: number,
    public readonly employeeId: number,
    public readonly contractorId: number,
    public readonly payment: number,
    public readonly typeOfAccount: string,
    public readonly discount: number,
    public readonly total: number,
  ) {}
}