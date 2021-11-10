export class RegisterEmployeeRequestDto{
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly age: number,
    public readonly yearsOfExperience: number,
    //public readonly rate: number,
    //public readonly availability: string
  ) {}
}