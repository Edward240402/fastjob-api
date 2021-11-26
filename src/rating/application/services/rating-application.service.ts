import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

@Injectable()
export class RatingApplicationService{
  constructor(
    private commandBus: CommandBus,
    private
  ) {}
}