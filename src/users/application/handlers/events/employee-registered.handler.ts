import { EventsHandler } from "@nestjs/cqrs/dist/utils/events-handler.decorator";
import { IEventHandler } from "@nestjs/cqrs";
import { EmployeeRegisteredEvent } from "../../../domain/events/employee-registered.event";

@EventsHandler(EmployeeRegisteredEvent)
export class  EmployeeRegisteredHandler implements IEventHandler<EmployeeRegisteredEvent> {
  constructor() {}

  handle(event: EmployeeRegisteredEvent) {
    console.log('handle logic for ContractorRegisteredHandler');
    console.log(event);
  }
}