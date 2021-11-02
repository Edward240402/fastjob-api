export class RegisterEmployeeCommand{
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly age: number,
    //public readonly rate: number,
    public readonly professionId: number,
    public readonly yearsOfExperience: number,
    //public readonly availability: string
  ) {}
}