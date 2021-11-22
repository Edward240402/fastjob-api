import { NotificationRegisteredEvent } from '../events/notification-registered.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { NotificationId } from '../value-objects/notification-id.value';
import { UserId } from '../../../users/domain/value-objects/user-id.value';
import { NotificationState } from '../value-objects/information.value';
import { PostId } from '../../../posts/domain/value-objects/post-id.value';

export class Notification extends AggregateRoot {
  private _id: NotificationId;
  private _employeeId: UserId;
  private _contractorId: UserId;
  private _postId: PostId;
  private _state: NotificationState;


  public constructor(id: NotificationId, employeeId: UserId, contractorId: UserId, postId: PostId, state: NotificationState) {
    super();
    this._id = id;
    this._employeeId = employeeId;
    this._contractorId = contractorId;
    this._postId = postId;
    this._state = state;
  }

  public register() {
    const event = new NotificationRegisteredEvent(
      this._id.getValue(),
      this._employeeId.getValue(),
      this._contractorId.getValue(),
      this._postId.getValue(),
      this._state.getState());
    this.apply(event);
  }

  public getId(): NotificationId {
    return this._id;
  }

  public getContractorId(): UserId{
    return this._contractorId;
  }

  public getEmployeeId(): UserId {
    return this._employeeId;
  }
  public getState(): NotificationState {
    return this._state;
  }
  public getPostId(): PostId {
    return this._postId;
  }
  public changeId(id: NotificationId) {
    this._id = id;
  }
  
}





