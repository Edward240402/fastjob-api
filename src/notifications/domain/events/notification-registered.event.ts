export class NotificationRegisteredEvent {
  constructor(
    public readonly id: number,
    public readonly idContractor: number,
    public readonly idEmployee: number,

  ) {}
}