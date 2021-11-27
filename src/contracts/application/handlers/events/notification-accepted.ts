import { EventsHandler } from "@nestjs/cqrs/dist/decorators/events-handler.decorator";
import { NotificationRegisteredEvent } from "../../../../notifications/domain/events/notification-registered.event";
import { CommandBus, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { EmployeeTypeORM } from "../../../../users/infrastructure/persistence/typeorm/entities/employee.typeorm";
import { getManager, Repository } from "typeorm";
import { ContractorTypeORM } from "../../../../users/infrastructure/persistence/typeorm/entities/contractorTypeORM";
import { UserId } from "../../../../users/domain/value-objects/user-id.value";
import { PostTypeORM } from "../../../../posts/infrastructure/persistence/typeorm/entities/post.typeorm";
import { JobType } from "../../../../common/domain/value-objects/job-type.value";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { Contract } from "../../../domain/entities/contract.entity";
import * as moment from "moment-timezone";
import { RegisterContractCommand } from "../../commands/register-contract.command";
import { ContractId } from "../../../domain/value-objects/contract-id.value";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";
import { State } from "../../../domain/value-objects/state.value";
import { ContractMapper } from "../../mapper/contract.mapper";
import { ContractTypeORM } from "../../../infrastructure/persistence/typeorm/entities/contract.typeorm";
import { NotificationState } from "../../../../notifications/domain/enums/notification-state";

@EventsHandler(NotificationRegisteredEvent)
export class NotificationAccepted implements IEventHandler<NotificationRegisteredEvent>{
  constructor(
    @InjectRepository(ContractTypeORM)
    private contractRepository: Repository<ContractTypeORM>,

    @InjectRepository(EmployeeTypeORM)
    private employeeRepository: Repository<EmployeeTypeORM>,

    @InjectRepository(ContractorTypeORM)
    private contractorRepository: Repository<ContractorTypeORM>,

    @InjectRepository(PostTypeORM)
    private postRepository: Repository<PostTypeORM>,

    private commandBus: CommandBus
  ) {}

  async handle(event: NotificationRegisteredEvent) {
    if(event.state == NotificationState.ACCEPTED){
      let employeeTypeORM: EmployeeTypeORM = await this.employeeRepository
        .createQueryBuilder()
        .where("employee_id = :id")
        .setParameter("id", Number(event.employeeId))
        .getOne();
      if(employeeTypeORM == null){
        console.log('Notification registered employeeTypeORM not found');
        return;
      }

      let contractorTypeORM: ContractorTypeORM = await this.contractorRepository
        .createQueryBuilder()
        .where("contractor_id = :id")
        .setParameter("id", Number(event.contractorId))
        .getOne();
      if(contractorTypeORM == null){
        console.log('Notification registered contractorTypeORM not found');
        return;
      }

      let postTypeORM: PostTypeORM = await this.postRepository
        .createQueryBuilder()

        .where("id = :id")
        .setParameter("id", Number(event.postId))
        .getOne();
      if(postTypeORM == null){
        console.log('Notification registered postTypeORM not found');
        return;
      }

      const employeeId: UserId = UserId.create(employeeTypeORM.id.value);
      const contractorId: UserId = UserId.create(contractorTypeORM.id.value);
      const datetime = moment.tz().toDate();
      const contractDateResult: Result<AppNotification, DateTime> = DateTime.create(datetime);
      if(contractDateResult.isFailure()){
        return 0;
      }
      const jobType: Result<AppNotification, JobType> = JobType.create(postTypeORM.job_type.job);
      if(jobType.isFailure()){
        return 0;
      }

      const stateResult: Result<AppNotification, State> = State.create(NotificationState.ACCEPTED);
      if(stateResult.isFailure()){
        return 0;
      }

      const registerContractCommand: RegisterContractCommand = new RegisterContractCommand(
        employeeId.getValue(),
        contractorId.getValue(),
        datetime,
        jobType.value.getJobType(),
        NotificationState.ACCEPTED,
      );

      const contractId = await this.commandBus.execute(registerContractCommand);

      const contract: Contract = new Contract(ContractId.create(contractId), employeeId, contractorId, contractDateResult.value, null, jobType.value, stateResult.value);
      let contractTypeORM: ContractTypeORM = ContractMapper.toTypeORM(contract);
      await getManager().transaction(async transactionalEntityManager => {
        contractTypeORM = await this.contractRepository.save(contractTypeORM);
        if (contractTypeORM == null){
          console.log('Contract creation error');
          return;
        }
      })
    }
  }
}