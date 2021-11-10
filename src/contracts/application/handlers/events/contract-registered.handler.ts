import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ContractRegisteredEvent } from "../../../domain/events/contract-registered.event";

@EventsHandler(ContractRegisteredEvent)
export class ContractRegisteredHandler implements IEventHandler<ContractRegisteredEvent> {
  constructor() {}

  handle(event: ContractRegisteredEvent) {
    console.log('handle logic for ContractRegisteredEvent');
    console.log(event);
  }
}