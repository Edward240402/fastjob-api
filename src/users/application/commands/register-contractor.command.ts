export class RegisterContractorCommand{
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly age: number,
    //public readonly rate: number
  ) {}
}