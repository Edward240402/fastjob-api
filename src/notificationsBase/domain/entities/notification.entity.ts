import { NotificationUserRegisteredEvent } from '../events/notification-registered.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { NotificationUsersId } from '../value-objects/notification-id.value';
import { IdEmployee } from '../value-objects/idEmployee.value';
import { IdContractor } from '../value-objects/idContractor.value';

export class NotificationUser extends AggregateRoot {
  private id: NotificationUsersId;
  private idContractor: IdContractor;
  private idEmployee: IdEmployee;

  public constructor(id: NotificationUsersId, idContractor: IdContractor,idEmployee: IdEmployee) {
    super();
    this.id = id;
    this.idContractor = idContractor;
    this.idEmployee = idEmployee;
  }

  public register() {
    const event = new NotificationUserRegisteredEvent(this.id.getValue(), this.idContractor.getIdContractor(), this.idEmployee.getIdEmployee());
    this.apply(event);
  }

  public getId(): NotificationUsersId {
    return this.id;
  }

  public getIdContractor(): IdContractor {
    return this.idContractor;
  }

  public getIdEmployee(): IdEmployee {
    return this.idEmployee;
  }

  public changeId(id: NotificationUsersId) {
    this.id = id;
  }

  public changeIdContractor(idContractor: IdContractor): void {
    this.idContractor = idContractor;
  }

  public changeIdEmployee(idEmployee: IdEmployee): void {
    this.idEmployee = idEmployee;
  }
}





