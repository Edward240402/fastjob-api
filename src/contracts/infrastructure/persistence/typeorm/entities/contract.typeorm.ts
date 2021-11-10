/*import { Column, Entity } from "typeorm";
import { Unique } from "typeorm/browser";
import { ContractIdTypeORM } from "./contract.id.typeorm";
import { UserIdTypeORM } from "../../../../../users/infrastructure/persistence/typeorm/entities/user.id.typeorm";
import { EmployeeIdTypeORM } from "../../../../../users/infrastructure/persistence/typeorm/entities/employee.id.typeorm";
import { ContractorIdTypeORM } from "../../../../../users/infrastructure/persistence/typeorm/entities/contractor.id.typeorm";

@Entity('contracts')
@Unique('UQ_contracts_id', ['id.value'])
export class ContractTypeORM {
  @Column(type => ContractIdTypeORM, { prefix: false })
  public id: ContractIdTypeORM;

  @Column(type => EmployeeIdTypeORM, { prefix: false })
  public employee_id: EmployeeIdTypeORM;

  @Column(type => ContractorIdTypeORM, { prefix: false })
  public contractor_id: ContractorIdTypeORM;

  @Column("")
}*/