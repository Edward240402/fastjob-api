import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionTypeorm } from '../../infrastructure/persistence/typeorm/entities/transaction.typeorm';
import { TransactionIdTypeorm } from '../../infrastructure/persistence/typeorm/entities/transaction.id.typeorm';
import { EmployeeIdTypeorm } from '../../../common/infrastructure/persistence/typeorm/entities/employee-id.typeorm';
import { ContractorIdTypeorm } from '../../../common/infrastructure/persistence/typeorm/entities/contractor-id.typeorm';
import { ContractIdTypeorm } from '../../../common/infrastructure/persistence/typeorm/entities/contract-id.typeorm';
import { PaymentTypeORM } from '../../infrastructure/persistence/typeorm/entities/payment.typeorm';
import { DiscountTypeORM } from '../../infrastructure/persistence/typeorm/entities/discount.typeorm';
import { TotalTypeORM } from '../../infrastructure/persistence/typeorm/entities/total.typeorm';
import { TypeOfAccountTypeORM } from '../../../users/infrastructure/persistence/typeorm/entities/typeOfAccount.typeorm';

export class TransactionMapper {
  public static toTypeORM(transaction: Transaction): TransactionTypeorm {
    const transactionTypeORM: TransactionTypeorm = new TransactionTypeorm();
    transactionTypeORM.id = TransactionIdTypeorm.from(transaction.getId().getValue());
    transactionTypeORM.contract_id = ContractIdTypeorm.from(transaction.getContractId().getValue())
    transactionTypeORM.employee_id = EmployeeIdTypeorm.from(transaction.getEmployeeId().getValue());
    transactionTypeORM.contractor_id = ContractorIdTypeorm.from(transaction.getContractorId().getValue());
    transactionTypeORM.payment = PaymentTypeORM.from(transaction.getPayment().getPayment());
    transactionTypeORM.type_of_account = TypeOfAccountTypeORM.from(transaction.getTypeOfAccount().getTypeOfAccount());
    transactionTypeORM.discount = DiscountTypeORM.from(transaction.getDiscount().getDiscount());
    transactionTypeORM.total = TotalTypeORM.from(transaction.getTotal().getTotal());
    return transactionTypeORM;
  }
}