import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RegisterContractCommand } from "../../commands/register-contract.command";
import { InjectRepository } from "@nestjs/typeorm";
import { ContractTypeORM } from "../../../infrastructure/persistence/typeorm/entities/contract.typeorm";
import { Repository } from "typeorm";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";
import { JobType } from "../../../../common/domain/value-objects/job-type.value";
import { State } from "../../../domain/value-objects/state.value";
import { Contract } from "../../../domain/entities/contract.entity";
import { ContractId } from "../../../domain/value-objects/contract-id.value";
import { UserId } from "../../../../users/domain/value-objects/user-id.value";
import { ContractMapper } from "../../mapper/contract.mapper";

@CommandHandler(RegisterContractCommand)
export class RegisterContractHandler
  implements ICommandHandler<RegisterContractCommand>{
  constructor(
    @InjectRepository(ContractTypeORM)
    private contractRepository: Repository<ContractTypeORM>,
    private publisher: EventPublisher
  ) {}

  async execute(command: RegisterContractCommand){
    const contractDateResult: Result<AppNotification, DateTime> = DateTime.create(command.contractDate);
    if(contractDateResult.isFailure()){
      return 0;
    }

    const jobTypeResult: Result<AppNotification, JobType> = JobType.create(command.jobType);
    if(jobTypeResult.isFailure()){
      return 0;
    }

    const stateResult: Result<AppNotification, State> = State.create(command.state);
    if(stateResult.isFailure()){
      return 0;
    }

    let contract: Contract = new Contract(ContractId.create(0), UserId.create(command.employeeId), UserId.create(command.contractorId),
      contractDateResult.value, null, jobTypeResult.value, stateResult.value);
    let contractTypeORM = ContractMapper.toTypeORM(contract);
    contractTypeORM = await this.contractRepository.save(contractTypeORM);
    if(contractTypeORM == null){
      return 0;
    }

    const contractId: number = Number(contractTypeORM.id.value);
    contract.changeId(ContractId.create(contractId));
    contract = this.publisher.mergeObjectContext(contract);
    contract.register();
    contract.commit();
    return contractId;
  }
}