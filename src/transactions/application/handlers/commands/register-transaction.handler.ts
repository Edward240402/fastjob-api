import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RegisterTransactionsCommand } from "../../commands/register-transaction.command";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionTypeorm } from "../../../infrastructure/persistence/typeorm/entities/transaction.typeorm";
import { Repository } from "typeorm";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { Discount } from '../../../domain/value-objects/discount.value';
import { TypeOfAccount } from '../../../../users/domain/value-objects/type-of-account.value';
import { Total } from '../../../domain/value-objects/total.value';
import { ContractId } from "../../../../contracts/domain/value-objects/contract-id.value";
import { UserId } from "../../../../users/domain/value-objects/user-id.value";
import { TransactionMapper } from "../../mapper/transaction.mapper";
import { Payment } from '../../../domain/value-objects/payment.value';
import { Transaction } from '../../../domain/entities/transaction.entity';
import { TransactionId } from '../../../domain/value-objects/transaction-id.value';

@CommandHandler(RegisterTransactionsCommand)
export class RegisterTransactionHandler
  implements ICommandHandler<RegisterTransactionsCommand>{
  constructor(
    @InjectRepository(TransactionTypeorm)
    private transactionRepository: Repository<TransactionTypeorm>,
    private publisher: EventPublisher
  ) {}

  async execute(command: RegisterTransactionsCommand){
    const paymentResult: Result<AppNotification, Payment> = Payment.create(command.payment);
    if(paymentResult.isFailure()){
      return 0;
    }

    const typeOfAccountResult: Result<AppNotification, TypeOfAccount> = TypeOfAccount.create(command.typeOfAccount);
    if(typeOfAccountResult.isFailure()){
      return 0;
    }

    const discountResult: Result<AppNotification, Discount> = Discount.create(command.discount);
    if(discountResult.isFailure()){
      return 0;
    }

    const totalResult: Result<AppNotification, Total> = Total.create(command.total);
    if(totalResult.isFailure()){
      return 0;
    }


    let transaction: Transaction = new Transaction(TransactionId.create(0),ContractId.create(command.contractId), UserId.create(command.employeeId), UserId.create(command.contractorId),
      paymentResult.value, typeOfAccountResult.value,discountResult.value,totalResult.value);
    let transactionTypeORM = TransactionMapper.toTypeORM(transaction);
    transactionTypeORM = await this.transactionRepository.save(transactionTypeORM);
    if(transactionTypeORM == null){
      return 0;
    }

    const transactionId: number = Number(transactionTypeORM.id.value);
    transaction.changeId(TransactionId.create(transactionId));
    transaction = this.publisher.mergeObjectContext(transaction);
    transaction.register();
    transaction.commit();
    return transactionId;
  }
}