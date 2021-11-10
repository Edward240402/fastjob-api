import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetContractorsQuery } from "../../queries/get-contractors.query";
import { getManager } from "typeorm";
import { GetContractorsDto } from "../../dtos/queries/get-contractors.dto";

@QueryHandler(GetContractorsQuery)
export class GetContractorsHandler implements IQueryHandler<GetContractorsQuery> {
  constructor() {}

  async execute(query: GetContractorsQuery){
    const manager = getManager();
    const sql = `
    SELECT
      contractor_id,
      name,
      email,
      password,
      age,
      rate,
      number_of_rates
     FROM 
        contractors
     ORDER BY
        contractor_id;`;
    const ormContractors = await manager.query(sql);
    if(ormContractors.length <= 0){
      return [];
    }
    const contractors: GetContractorsDto[] = ormContractors.map(function(ormContractor){
      let contractorDto = new GetContractorsDto()
      contractorDto.id = Number(ormContractor.contractor_id);
      contractorDto.name = ormContractor.name;
      contractorDto.email = ormContractor.email;
      contractorDto.password = ormContractor.password;
      contractorDto.age = ormContractor.age;
      contractorDto.rate = ormContractor.rate;
      contractorDto.numberOfRates = ormContractor.number_of_rates;
      return contractorDto;
    });
    return contractors;
  }
}