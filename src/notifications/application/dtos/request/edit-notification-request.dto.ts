export class EditNotificationUsersRequestDto {
  constructor(
    public readonly employeeId: number,
    public readonly contractorId: number,
    public readonly postId: number,
    public readonly information: string,
  ) {}
}
