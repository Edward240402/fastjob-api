import { Column, Entity, Unique } from "typeorm";
import { ContractIdTypeORM } from "./contract.id.typeorm";
import { ContractDateTypeORM } from "./contractDate.typeorm";
import { AgreedDateTypeORM } from "./agreedDateTypeORM";
import { JobTypeORM } from "../../../../../common/infrastructure/persistence/typeorm/entities/job.typeorm";
import { StateTypeORM } from "./state.typeorm";
import { EmployeeIdTypeorm } from "../../../../../common/infrastructure/persistence/typeorm/entities/employee-id.typeorm";
import { ContractorIdTypeorm } from "../../../../../common/infrastructure/persistence/typeorm/entities/contractor-id.typeorm";

@Entity('contracts')
@Unique('UQ_contracts_id', ['id.value'])
export class ContractTypeORM {
  @Column(type => ContractIdTypeORM, { prefix: false })
  public id: ContractIdTypeORM;

  @Column(type => EmployeeIdTypeorm, { prefix: false })
  public employee_id: EmployeeIdTypeorm;

  @Column(type => ContractorIdTypeorm, { prefix: false })
  public contractor_id: ContractorIdTypeorm;

  @Column(type => ContractDateTypeORM, { prefix: false })
  public contract_date: ContractDateTypeORM;

  @Column(type => AgreedDateTypeORM, { prefix: false })
  public agreed_date: AgreedDateTypeORM;

  @Column(type => JobTypeORM, { prefix: false })
  public job_type: JobTypeORM;

  @Column(type => StateTypeORM, { prefix: false })
  public state: StateTypeORM;
}