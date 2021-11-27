import { AggregateRoot } from "@nestjs/cqrs";
import { UserId } from "../../../users/domain/value-objects/user-id.value";
import { Discount } from '../value-objects/discount.value';
import { Total } from '../value-objects/total.value';
import { Payment } from '../value-objects/payment.value';
import { TransactionRegisteredEvent } from '../events/transaction-registered.event';
import { TransactionId } from '../value-objects/transaction-id.value';
import { ContractId } from "../../../contracts/domain/value-objects/contract-id.value";
import { TypeOfAccount } from '../../../users/domain/value-objects/type-of-account.value';


export class Transaction extends AggregateRoot{
  private _id: TransactionId;
  private _contractId: ContractId;
  private _employeeId: UserId;
  private _contractorId: UserId;
  private _payment: Payment;
  private _typeOfAccount: TypeOfAccount;
  private _discount: Discount;
  private _total: Total;


  public constructor(id:TransactionId,contractId: ContractId, employeeId: UserId, contractorId: UserId,
                     payment: Payment, typeOfAccount: TypeOfAccount, discount: Discount, total: Total) {
    super();
    this._id = id;
    this._contractId = contractId;
    this._employeeId = employeeId;
    this._contractorId = contractorId;
    this._payment = payment;
    this._typeOfAccount = typeOfAccount;
    this._discount = discount;
    this._total = total;
  }

  public register() {
    /*let agreedDate;
    if(this._agreedDate == null) agreedDate = "No established";
    else agreedDate = this._agreedDate.getDate().toString();
*/
    const event = new TransactionRegisteredEvent(
      this._id.getValue(),
      this._contractId.getValue(),
      this._employeeId.getValue(),
      this._contractorId.getValue(),
      this._payment.getPayment(),
      this._typeOfAccount.getTypeOfAccount(),
      this._discount.getDiscount(),
      this._total.getTotal());
    this.apply(event);
  }

  public changeId(id: TransactionId) {
    this._id = id;
  }

  public getId(): TransactionId {
    return this._id;
  }
  public getContractId(): ContractId {
    return this._contractId;
  }

  public getEmployeeId(): UserId {
    return this._employeeId;
  }

  public getContractorId(): UserId {
    return this._contractorId;
  }
  public getPayment(): Payment {
    return this._payment;
  }
  public getTypeOfAccount(): TypeOfAccount {
    return this._typeOfAccount;
  }
  public getDiscount(): Discount {
    return this._discount;
  }
  public getTotal(): Total {
    return this._total;
  }

}