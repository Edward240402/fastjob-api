export class RegisterNotificationRequestDto {
  constructor(
    public readonly idContractor: number,
    public readonly idEmployee: number,
  ) {}
}
