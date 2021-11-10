export class RegisterNotificationResponseDto {
  constructor(
    public id: number,
    public readonly idContractor: number,
    public readonly idEmployee: number,
  ) {}
}
