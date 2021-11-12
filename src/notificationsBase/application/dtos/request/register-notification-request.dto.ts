export class RegisterNotificationUsersRequestDto {
  constructor(
    public readonly idContractor: number,
    public readonly idEmployee: number,
  ) {}
}
