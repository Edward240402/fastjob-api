import { NotificationUserRegisteredEvent } from '../../../domain/events/notification-registered.event';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';

@EventsHandler(NotificationUserRegisteredEvent)
export class NotificationUserRegisteredHandler implements IEventHandler<NotificationUserRegisteredEvent> {
  constructor() {}

  handle(event: NotificationUserRegisteredEvent) {
    console.log('handle logic for NotificationRegisteredEvent');
    console.log(event);
  }
}