export class RegisterEmployeeCommand{
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly age: number,
    public readonly yearsOfExperience: number,
    public readonly availability: string
    //public readonly rate: number,
  ) {}
}