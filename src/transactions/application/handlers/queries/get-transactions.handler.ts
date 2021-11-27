import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetTransactionQuery } from "../../queries/get-transaction.query";
import { getManager } from "typeorm";
import { GetTransactionsDto } from '../../dtos/queries/get-transactions.dto';

@QueryHandler(GetTransactionQuery)
export class GetTransactionsHandler implements IQueryHandler<GetTransactionQuery>{
  constructor() {}

  async execute(query: GetTransactionQuery){
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      contract_id,
      employee_id,
      contractor_id,
      payment,
      type_of_account,
      discount,
      total
    FROM 
      transactions
    ORDER BY
      id;`;

    const ormTransactions = await manager.query(sql);
    if(ormTransactions.length <= 0){
      return [];
    }

    const transactions: GetTransactionsDto[] = ormTransactions.map(function(ormTransaction) {
      let transactionDto = new GetTransactionsDto();
      transactionDto.id = Number(ormTransaction.id);
      transactionDto.contractId = Number(ormTransaction.contract_id);
      transactionDto.employeeId = Number(ormTransaction.employee_id);
      transactionDto.contractorId = Number(ormTransaction.contractor_id);
      transactionDto.payment = ormTransaction.payment;
      transactionDto.typeOfAccount = ormTransaction.type_of_account;
      transactionDto.discount = ormTransaction.discount;
      transactionDto.total = ormTransaction.total;
      return transactionDto;
    });
    return transactions;
  }
}