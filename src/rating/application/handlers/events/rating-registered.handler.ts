import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { RatingRegisteredEvent } from "../../../domain/events/rating-registered.event";

@EventsHandler(RatingRegisteredEvent)
export class RatingRegisteredHandler implements IEventHandler<RatingRegisteredEvent> {
  constructor() {}

  handle(event: RatingRegisteredEvent) {
    console.log('handle logic for RatingRegisteredEvent');
    console.log(event);
  }
}