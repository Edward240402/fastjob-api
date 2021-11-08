import { NotificationRegisteredEvent } from '../events/notification-registered.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { NotificationId } from '../value-objects/notification-id.value';

import { IdContractor } from '../value-objects/idContractor.value';
import { IdEmployee } from '../value-objects/idEmployee.value';

export class Notification extends AggregateRoot {
  private id: NotificationId;
  private idContractor: IdContractor;
  private idEmployee: IdEmployee;

  public constructor(id: NotificationId, idContractor: IdContractor,idEmployee: IdEmployee) {
    super();
    this.id = id;
    this.idContractor = idContractor;
    this.idEmployee = idEmployee;

  }

  public register() {
    const event = new NotificationRegisteredEvent(this.id.getValue(), this.idContractor.getValue(), this.idEmployee.getValue());
    this.apply(event);
  }

  public getId():NotificationId {
    return this.id;
  }

  public getIdContractor(): IdContractor {
    return this.idContractor;
  }

  public getIdEmployee(): IdEmployee {
    return this.idEmployee;
  }

  public changeId(id: NotificationId) {
    this.id = id;
  }

  public changeIdContractor(idContractor: IdContractor): void {
    this.idContractor = idContractor;
  }

  public changeIdEmployee(idEmployee: IdEmployee): void {
    this.idEmployee = idEmployee;
  }
}