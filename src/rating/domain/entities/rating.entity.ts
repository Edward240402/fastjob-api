import { AggregateRoot } from "@nestjs/cqrs";
import { RatingId } from "../value-objects/rating-id.value";
import { ContractId } from "../../../contracts/domain/value-objects/contract-id.value";
import { Rate } from "../value-objects/rate.value";
import { RatingRegisteredEvent } from "../events/rating-registered.event";

export class Rating extends AggregateRoot{
  private id: RatingId;
  private contractId: ContractId;
  private rate: Rate;

  public constructor(id: RatingId, contractId: ContractId, rate: Rate) {
    super();
    this.id = id;
    this.contractId = contractId;
    this.rate = rate;
  }

  public register(){
    const event = new RatingRegisteredEvent(
      this.id.getValue(),
      this.contractId.getValue(),
      this.rate.getRate());
    this.apply(event);
  }

  public changeId(id: RatingId) {
    this.id = id;
  }

  public getId(): RatingId {
    return this.id;
  }

  public getContractId(): ContractId {
    return this.contractId;
  }

  public getRate(): Rate {
    return this.rate;
  }
}