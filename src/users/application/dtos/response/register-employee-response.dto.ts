export class RegisterEmployeeResponseDto{
  constructor(
    public id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly age: number,
    public readonly rate: number,
    public readonly numberOfRates: number,
    public readonly yearsOfExperience: number,
    public readonly availability: string,
    public readonly typeOfAccount: string,
  ) {}
}