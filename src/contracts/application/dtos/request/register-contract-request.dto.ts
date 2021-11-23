import { RegisterEntityRequestDto } from "../../../../common/application/dtos/request/register-entity-request.dto";

export class RegisterContractRequestDto implements RegisterEntityRequestDto{
  constructor(
    public readonly employeeId: number,
    public readonly contractorId: number,
    public readonly jobType: string
  ) {}
}