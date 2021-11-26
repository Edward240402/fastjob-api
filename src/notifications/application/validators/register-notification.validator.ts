
import { NotificationTypeORM } from '../../infrastructure/persistence/typeorm/entities/notification.typeorm';
import { Repository } from 'typeorm';

import { RegisterNotificationRequestDto } from '../dtos/request/register-notification-request.dto';
import { AppNotification } from '../../../common/application/app.notification';
import { EmployeeTypeORM } from '../../../users/infrastructure/persistence/typeorm/entities/employee.typeorm';
import { ContractorTypeORM } from '../../../users/infrastructure/persistence/typeorm/entities/contractorTypeORM';
import { PostTypeORM } from '../../../posts/infrastructure/persistence/typeorm/entities/post.typeorm'
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotificationState } from "../../domain/enums/notification-state";

@Injectable()
export class RegisterNotificationValidator {
  constructor(
    @InjectRepository(NotificationTypeORM)
    private notificationRepository: Repository<NotificationTypeORM>,

    @InjectRepository(EmployeeTypeORM)
    private employeeRepository: Repository<EmployeeTypeORM>,

    @InjectRepository(ContractorTypeORM)
    private contractorRepository: Repository<ContractorTypeORM>,

    @InjectRepository(PostTypeORM)
    private postRepository: Repository<PostTypeORM>
  ) {}

  public async validate(registerNotificationRequestDto: RegisterNotificationRequestDto): Promise<AppNotification>{
    const notification: AppNotification = new AppNotification();

    const state: string = registerNotificationRequestDto.state.trim();
    if (state.length <= 0){
      notification.addError('State is required', null);
    }
    if(state != NotificationState.PENDING && state != NotificationState.ACCEPTED && state != NotificationState.REJECTED){
      notification.addError('Not valid state', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    let id: number = registerNotificationRequestDto.employeeId;
    const employee: EmployeeTypeORM = await this.employeeRepository.createQueryBuilder().where("employee_id = :id", {id}).getOne();
    if(employee == null){
      notification.addError('Employee not found', null);
    }

    id = registerNotificationRequestDto.contractorId;
    const contractor: ContractorTypeORM = await this.contractorRepository.createQueryBuilder().where("contractor_id = :id", {id}).getOne();
    if(contractor == null){
      notification.addError('Contractor not found', null);
    }

    id = registerNotificationRequestDto.postId;
    const post: PostTypeORM = await this.postRepository.createQueryBuilder().where("id = :id", {id}).getOne();
    if(post == null){
      notification.addError('Post not found', null);
    }

    return notification;
  }
}
