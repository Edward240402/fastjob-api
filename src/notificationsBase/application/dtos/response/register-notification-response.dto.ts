export class RegisterNotificationUsersResponseDto {
  constructor(
    public id: number,
    public readonly idContractor: number,
    public readonly idEmployee: number,
  ) {}
}
