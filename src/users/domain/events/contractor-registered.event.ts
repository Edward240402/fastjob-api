export class ContractorRegisteredEvent{
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly age: number,
    public readonly rate: number,
    public readonly numberOfRates: number
  ) {}
}