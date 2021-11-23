import { RegisterEntityResponseDto } from "../../../../common/application/dtos/response/register-entity-response.dto";

export class RegisterContractResponseDto extends RegisterEntityResponseDto{
  constructor(
    public id: number,
    public readonly employeeId: number,
    public readonly contractorId: number,
    public readonly contractDate: string,
    public readonly agreedDate: string,
    public readonly jobType: string,
    public readonly state: string
  ) {
    super();
  }
}