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
      employee_id,
      name,
      email,
      password,
      age,
      rate,
      number_of_rates,
      years_of_experience,
      availability,
      type_of_account
     FROM 
        employees
     ORDER BY
        rate DESC;`;
    const ormEmployees = await manager.query(sql);
    if(ormEmployees.length <= 0){
      return [];
    }
    const employees: GetEmployeesDto[] = ormEmployees.map(function(ormEmployee){
      let employeeDto = new GetEmployeesDto()
      employeeDto.id = Number(ormEmployee.employee_id);
      employeeDto.name = ormEmployee.name;
      employeeDto.email = ormEmployee.email;
      employeeDto.password = ormEmployee.password;
      employeeDto.age = ormEmployee.age;
      employeeDto.rate = ormEmployee.rate;
      employeeDto.numberOfRates = ormEmployee.number_of_rates;
      employeeDto.yearsOfExperience = ormEmployee.years_of_experience;
      employeeDto.availability = ormEmployee.availability;
      employeeDto.typeOfAccount = ormEmployee.type_of_account;
      return employeeDto;
    });
    return employees;
  }
}