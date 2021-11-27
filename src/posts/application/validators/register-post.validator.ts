import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostTypeORM } from "../../infrastructure/persistence/typeorm/entities/post.typeorm";
import { Repository } from "typeorm";
import { RegisterPostRequestDto } from "../dtos/request/register-post-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { EmployeeTypeORM } from "../../../users/infrastructure/persistence/typeorm/entities/employee.typeorm";

@Injectable()
export class RegisterPostValidator{
  constructor(
    @InjectRepository(PostTypeORM)
    private postRepository: Repository<PostTypeORM>,

    @InjectRepository(EmployeeTypeORM)
    private employeeRepository: Repository<EmployeeTypeORM>
  ) {}

  public async validate(registerPostRequestDto: RegisterPostRequestDto): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();

    const employeeId: number = registerPostRequestDto.employeeId;
    if(employeeId == null){
      notification.addError('Employee Id is required', null);
    }

    const imageUrl: string = registerPostRequestDto.imageUrl.trim();
    if(imageUrl.length <= 0){
      notification.addError('Image is required', null);
    }

    const text: string = registerPostRequestDto.text.trim();
    if(text.length <= 0){
      notification.addError('Post content is required', null);
    }

    const jobType: string = registerPostRequestDto.jobType.trim();
    if(jobType.length <= 0){
      notification.addError('Job Type is required', null);
    }

    if(notification.hasErrors()){
      return notification;
    }

    const employee: EmployeeTypeORM = await this.employeeRepository.createQueryBuilder().where("employee_id = :employeeId", {employeeId}).getOne();
    if(employee == null){
      notification.addError('Employee not found', null);
    }
    return notification;
  }
}