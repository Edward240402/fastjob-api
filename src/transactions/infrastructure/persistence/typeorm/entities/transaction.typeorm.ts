import { Column, Entity, Unique } from 'typeorm';
import { TransactionIdTypeorm } from './transaction.id.typeorm';
import { PaymentTypeORM } from './payment.typeorm';
import { EmployeeIdTypeorm } from '../../../../../common/infrastructure/persistence/typeorm/entities/employee-id.typeorm';
import { ContractorIdTypeorm } from '../../../../../common/infrastructure/persistence/typeorm/entities/contractor-id.typeorm';
import { ContractIdTypeorm } from '../../../../../common/infrastructure/persistence/typeorm/entities/contract-id.typeorm';
import { TypeOfAccountTypeORM } from '../../../../../users/infrastructure/persistence/typeorm/entities/typeOfAccount.typeorm';
import { DiscountTypeORM } from './discount.typeorm';
import { TotalTypeORM } from './total.typeorm';

@Entity('transactions')
@Unique('UQ_transactions_id', ['id.value'])
export class TransactionTypeorm {
  @Column(type => TransactionIdTypeorm, { prefix: false })
  public id: TransactionIdTypeorm;

  @Column(type => ContractIdTypeorm, { prefix: false })
  public contract_id: ContractIdTypeorm;

  @Column(type => EmployeeIdTypeorm, { prefix: false })
  public employee_id: EmployeeIdTypeorm;

  @Column(type => ContractorIdTypeorm, { prefix: false })
  public contractor_id: ContractorIdTypeorm;

  @Column(type => PaymentTypeORM, { prefix: false })
  public payment: PaymentTypeORM;

  @Column(type => TypeOfAccountTypeORM, { prefix: false })
  public type_of_account: TypeOfAccountTypeORM;

  @Column(type => DiscountTypeORM, { prefix: false })
  public discount: DiscountTypeORM;

  @Column(type => TotalTypeORM, { prefix: false })
  public total: TotalTypeORM;
}
