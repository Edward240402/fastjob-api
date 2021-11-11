import { NotificationRegisteredEvent } from '../events/notification-registered.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { NotificationsBaseId } from '../value-objects/notification-id.value';
import { IdContractor } from '../value-objects/idContractor.value';
import { IdEmployee } from '../value-objects/idEmployee.value';

export class Notification extends AggregateRoot {
  private id: NotificationsBaseId;
  private idContractor: IdContractor;
  private idEmployee: IdEmployee;

  public constructor(id: NotificationsBaseId, idContractor: IdContractor,idEmployee: IdEmployee) {
    super();
    this.id = id;
    this.idContractor = idContractor;
    this.idEmployee = idEmployee;
  }

  public register() {
    const event = new NotificationRegisteredEvent(this.id.getValue(), this.idContractor.getIdContractor(), this.idEmployee.getIdEmployee());
    this.apply(event);
  }

  public getId(): NotificationsBaseId {
    return this.id;
  }

  public getIdContractor(): IdContractor {
    return this.idContractor;
  }

  public getIdEmployee(): IdEmployee {
    return this.idEmployee;
  }

  public changeId(id: NotificationsBaseId) {
    this.id = id;
  }

  public changeIdContractor(idContractor: IdContractor): void {
    this.idContractor = idContractor;
  }

  public changeIdEmployee(idEmployee: IdEmployee): void {
    this.idEmployee = idEmployee;
  }
}





