import { EventsHandler } from "@nestjs/cqrs/dist/utils/events-handler.decorator";
import { ContractorRegisteredEvent } from "../../../domain/events/contractor-registered.event";
import { IEventHandler } from "@nestjs/cqrs";

@EventsHandler(ContractorRegisteredEvent)
export class  ContractorRegisteredHandler implements IEventHandler<ContractorRegisteredEvent> {
  constructor() {}

  handle(event: ContractorRegisteredEvent) {
    console.log('handle logic for ContractorRegisteredHandler');
    console.log(event);
  }
}