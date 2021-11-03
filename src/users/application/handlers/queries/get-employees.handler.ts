import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { getManager } from "typeorm";
import { GetEmployeesQuery } from "../../queries/get-employees.query";
import { GetEmployeesDto } from "../../dtos/queries/get-employees.dto";

@QueryHandler(GetEmployeesQuery)
export class GetEmployeesHandler implements IQueryHandler<GetEmployeesQuery> {
  constructor() {}

  async execute(query: GetEmployeesQuery){
    const manager = getManager();
    const sql = `
    SELECT
      user_id,
      name,
      email,
      password,
      age,
      rate,
      number_of_rates,
      profession_id,
      years_of_experience,
      availability
     FROM 
        employees
     ORDER BY
        user_id`;
    const ormEmployees = await manager.query(sql);
    if(ormEmployees.length <= 0){
      return [];
    }
    const employees: GetEmployeesDto[] = ormEmployees.map(function(ormEmployee){
      let employeeDto = new GetEmployeesDto()
      employeeDto.id = Number(ormEmployee.id);
      employeeDto.name = ormEmployee.name;
      employeeDto.email = ormEmployee.email;
      employeeDto.password = ormEmployee.password;
      employeeDto.age = ormEmployee.age;
      employeeDto.rate = ormEmployee.rate;
      employeeDto.numberOfRates = ormEmployee.numberOfRates;
      employeeDto.professionId = ormEmployee.professionId;
      employeeDto.yearsOfExperience = ormEmployee.yearsOfExperience;
      employeeDto.availability = ormEmployee.availability;
    });
    return employees;
  }
}