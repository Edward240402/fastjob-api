import { Controller } from "@nestjs/common";

@Controller('contracts')
export class ContractsController {
  constructor(
    private readonly contractorsApplicationService:
  ) {
  }
}