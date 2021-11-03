import { Controller, Post, Body, Res, Get, Put } from '@nestjs/common';
import { UsersApplicationService } from "../application/services/users-application.service";
import { QueryBus } from "@nestjs/cqrs";
import { RegisterContractorRequestDto } from "../application/dtos/request/register-contractor-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../common/application/app.notification";
import { RegisterContractorResponseDto } from "../application/dtos/response/register-contractor-response.dto";
import { ApiController } from "../../common/api/api.controller";
import { RegisterEmployeeRequestDto } from "../application/dtos/request/register-employee-request.dto";
import { RegisterEmployeeResponseDto } from "../application/dtos/response/register-employee-response.dto";
import { GetContractorsQuery } from "../application/queries/get-contractors.query";
import { GetEmployeesQuery } from "../application/queries/get-employees.query";

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersApplicationService: UsersApplicationService,
    private readonly queryBus: QueryBus
  ) {
  }

  @Post('contractors')
  async registerContractor(
    @Body() registerContractorRequestDto: RegisterContractorRequestDto,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterContractorResponseDto> = await this.usersApplicationService.registerContractor(registerContractorRequestDto);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post('employees')
  async registerEmployee(
    @Body() registerEmployeeRequestDto: RegisterEmployeeRequestDto,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterEmployeeResponseDto> = await this.usersApplicationService.registerEmployee(registerEmployeeRequestDto);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('contractors')
  async getContractors(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const contractors = await this.queryBus.execute(new GetContractorsQuery());
      return ApiController.ok(response, contractors);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('employees')
  async getEmployees(@Res({passthrough: true}) response): Promise<object>{
    try {
      const employees = await this.queryBus.execute(new GetEmployeesQuery());
      return ApiController.ok(response, employees);
    } catch (error){
      return ApiController.serverError(response, error);
    }
  }
}