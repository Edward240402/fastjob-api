import { Column, Entity } from "typeorm";
import { Unique } from "typeorm/browser";
import { ContractIdTypeORM } from "./contract.id.typeorm";
import { EmployeeIdTypeORM } from "../../../../../users/infrastructure/persistence/typeorm/entities/employee.id.typeorm";
import { ContractorIdTypeORM } from "../../../../../users/infrastructure/persistence/typeorm/entities/contractor.id.typeorm";
import { ContractDateTypeORM } from "./contractDate.typeorm";
import { AgreedDateTypeorm } from "./agreedDate.typeorm";
import { JobTypeORM } from "./job.typeorm";
import { StateTypeORM } from "./state.typeorm";

@Entity('contracts')
@Unique('UQ_contracts_id', ['id.value'])
export class ContractTypeORM {
  @Column(type => ContractIdTypeORM, { prefix: false })
  public id: ContractIdTypeORM;

  @Column(type => EmployeeIdTypeORM, { prefix: false })
  public employee_id: EmployeeIdTypeORM;

  @Column(type => ContractorIdTypeORM, { prefix: false })
  public contractor_id: ContractorIdTypeORM;

  @Column(type => ContractDateTypeORM, { prefix: false })
  public contract_date: ContractDateTypeORM;

  @Column(type => AgreedDateTypeorm, { prefix: false })
  public agreed_date: AgreedDateTypeorm;

  @Column(type => JobTypeORM, { prefix: false })
  public job_type: JobTypeORM;

  @Column(type => StateTypeORM, { prefix: false })
  public state: StateTypeORM;
}