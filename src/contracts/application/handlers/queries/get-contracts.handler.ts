import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetContractsQuery } from "../../quieries/get-contracts.query";
import { getManager } from "typeorm";
import { GetContractsDto } from "../../dtos/queries/get-contracts.dto";

@QueryHandler(GetContractsQuery)
export class GetContractsHandler implements IQueryHandler<GetContractsQuery>{
  constructor() {}

  async execute(query: GetContractsQuery){
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      employee_id,
      contractor_id,
      contract_date,
      agreed_date,
      job,
      state
    FROM 
      contracts
    ORDER BY
      id;`;

    const ormContracts = await manager.query(sql);
    if(ormContracts.length <= 0){
      return [];
    }

    const contracts: GetContractsDto[] = ormContracts.map(function(ormContract) {
      let contractDto = new GetContractsDto();
      contractDto.id = Number(ormContract.id);
      contractDto.employeeId = Number(ormContract.employee_id);
      contractDto.contractorId = Number(ormContract.contractor_id);
      contractDto.contractDate = ormContract.contract_date;
      contractDto.agreedDate = ormContract.agreed_date;
      contractDto.jobType = ormContract.job;
      contractDto.state = ormContract.state;
      return contractDto;
    });
    return contracts;
  }
}