import { NotificationUserRegisteredEvent } from '../events/notification-registered.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { NotificationUsersId } from '../value-objects/notification-id.value';
import { UserId } from '../../../users/domain/value-objects/user-id.value';
import { Information } from '../value-objects/information.value';
import { PostId } from '../../../posts/domain/value-objects/post-id.value';

export class NotificationUser extends AggregateRoot {
  private _id: NotificationUsersId;
  private _employeeId: UserId;
  private _contractorId: UserId;
  private _information: Information;
  private _postId: PostId;


  public constructor(id: NotificationUsersId, employeeId: UserId, contractorId: UserId, postId: PostId, information: Information) {
    super();
    this._id = id;
    this._employeeId = employeeId;
    this._contractorId = contractorId;
    this._postId = postId;
    this._information = information;

  }

  public register() {
    const event = new NotificationUserRegisteredEvent(
      this._id.getValue(),
      this._employeeId.getValue(),
      this._contractorId.getValue(),
      this._postId.getValue(),
      this._information.getInformation());
    this.apply(event);
  }

  public getId(): NotificationUsersId {
    return this._id;
  }

  public getContractorId(): UserId{
    return this._contractorId;
  }

  public getEmployeeId(): UserId {
    return this._employeeId;
  }
  public getInformation(): Information {
    return this._information;
  }
  public getPostId(): PostId {
    return this._postId;
  }
  public changeId(id: NotificationUsersId) {
    this._id = id;
  }
  
}





