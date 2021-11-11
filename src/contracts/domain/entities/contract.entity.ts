import { ContractId } from "../value-objects/contract-id.value";
import { AggregateRoot } from "@nestjs/cqrs";
import { UserId } from "../../../users/domain/value-objects/user-id.value";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";
import { JobType } from "../../../common/domain/value-objects/job-type.value";
import { State } from "../value-objects/state.value";
import { ContractRegisteredEvent } from "../events/contract-registered.event";

export class Contract extends AggregateRoot{
  private _id: ContractId;
  private _employeeId: UserId;
  private _contractorId: UserId;
  private _contractDate: DateTime;
  private _agreedDate: DateTime;
  private _jobType: JobType;
  private _state: State;

  public constructor(id: ContractId, employeeId: UserId, contractorId: UserId,
                     contractDate: DateTime, agreedDate: DateTime, jobType: JobType, state: State) {
    super();
    this._id = id;
    this._employeeId = employeeId;
    this._contractorId = contractorId;
    this._contractDate = contractDate;
    this._agreedDate = agreedDate;
    this._jobType = jobType;
    this._state = state;
  }

  public register() {
    let agreedDate;
    if(this._agreedDate == null) agreedDate = "No established";
    else agreedDate = this._agreedDate.getDate().toString();

    const event = new ContractRegisteredEvent(
      this._id.getValue(),
      this._employeeId.getValue(),
      this._contractorId.getValue(),
      this._contractDate.getDate().toString(),
      agreedDate,
      this._jobType.getJobType(),
      this._state.getState());
    this.apply(event);
  }

  public changeId(id: ContractId) {
    this._id = id;
  }

  public getId(): ContractId {
    return this._id;
  }

  public getEmployeeId(): UserId {
    return this._employeeId;
  }

  public getContractorId(): UserId {
    return this._contractorId;
  }

  public getContractDate(): DateTime {
    return this._contractDate;
  }

  public getAgreedDate(): DateTime {
    return this._agreedDate;
  }

  public getJobType(): JobType {
    return this._jobType;
  }

  public getState(): State {
    return this._state;
  }
}