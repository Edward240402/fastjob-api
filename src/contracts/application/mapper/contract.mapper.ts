import { Contract } from "../../domain/entities/contract.entity";
import { ContractTypeORM } from "../../infrastructure/persistence/typeorm/entities/contract.typeorm";
import { ContractIdTypeORM } from "../../infrastructure/persistence/typeorm/entities/contract.id.typeorm";
import { ContractDateTypeORM } from "../../infrastructure/persistence/typeorm/entities/contractDate.typeorm";
import { AgreedDateTypeORM } from "../../infrastructure/persistence/typeorm/entities/agreedDateTypeORM";
import { JobTypeORM } from "../../infrastructure/persistence/typeorm/entities/job.typeorm";
import { StateTypeORM } from "../../infrastructure/persistence/typeorm/entities/state.typeorm";
import { EmployeeIdTypeorm } from "../../infrastructure/persistence/typeorm/entities/employee-id.typeorm";
import { ContractorIdTypeorm } from "../../infrastructure/persistence/typeorm/entities/contractor-id.typeorm";

export class ContractMapper{
  public static toTypeORM(contract: Contract): ContractTypeORM{
    const contractTypeORM: ContractTypeORM = new ContractTypeORM();
    contractTypeORM.id = ContractIdTypeORM.from(contract.getId().getValue());
    contractTypeORM.employee_id = EmployeeIdTypeorm.from(contract.getEmployeeId().getValue());
    contractTypeORM.contractor_id = ContractorIdTypeorm.from(contract.getContractorId().getValue());
    contractTypeORM.contract_date = ContractDateTypeORM.from(contract.getContractDate().getDate());
    if (contract.getAgreedDate() == null) contractTypeORM.agreed_date = null;
    else contractTypeORM.agreed_date = AgreedDateTypeORM.from(contract.getAgreedDate().getDate());
    contractTypeORM.job_type = JobTypeORM.from(contract.getJobType().getJobType());
    contractTypeORM.state = StateTypeORM.from(contract.getState().getState());
    return contractTypeORM;
  }
}