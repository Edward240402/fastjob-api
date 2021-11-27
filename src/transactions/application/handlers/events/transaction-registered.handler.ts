import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TransactionRegisteredEvent } from "../../../domain/events/transaction-registered.event";

@EventsHandler(TransactionRegisteredEvent)
export class TransactionRegisteredHandler implements IEventHandler<TransactionRegisteredEvent> {
  constructor() {}

  handle(event: TransactionRegisteredEvent) {
    console.log('handle logic for TransactionRegisteredEvent');
    console.log(event);
  }
}