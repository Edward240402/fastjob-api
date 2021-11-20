export class NotificationUserRegisteredEvent {
  constructor(
    public readonly id: number,
    public readonly employeeId: number,
    public readonly contractorId: number,
    public readonly postId: number,
    public readonly information: string,

  ) {}
}