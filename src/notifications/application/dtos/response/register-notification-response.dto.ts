export class RegisterNotificationUsersResponseDto {
  constructor(
    public id: number,
    public readonly employeeId: number,
    public readonly contractorId: number,
    public readonly postId: number,
    public readonly information: string,
  ) {}
}
