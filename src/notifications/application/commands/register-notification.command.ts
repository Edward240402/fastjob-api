export class RegisterNotificationCommand {
  constructor(
    public readonly employeeId: number,
    public readonly contractorId: number,
    public readonly postId: number,
    public readonly state: string,
  ) {}
}

