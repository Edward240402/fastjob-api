export class RegisterPostResponseDto {
  constructor(
    public id: number,
    public readonly employeeId: number,
    public readonly publishDate: string,
    public readonly imageUrl: string,
    public readonly text: string,
    public readonly jobType: string
  ) {}
}