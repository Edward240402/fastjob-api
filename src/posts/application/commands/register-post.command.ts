export class RegisterPostCommand{
  constructor(
    public readonly employeeId: number,
    public readonly publishDate: Date,
    public readonly imageUrl: string,
    public readonly text: string,
    public readonly jobType: string
  ) {}
}