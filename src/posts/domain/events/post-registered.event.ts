export class PostRegisteredEvent {
  constructor(
    public readonly id: number,
    public readonly employeeId: number,
    public readonly publishDate: string,
    public readonly imageUrl: string,
    public readonly text: string,
    public readonly jobType: string
  ) {}
}