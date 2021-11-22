import { NotificationRegisteredEvent } from '../../../domain/events/notification-registered.event';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';

@EventsHandler(NotificationRegisteredEvent)
export class NotificationRegisteredHandler implements IEventHandler<NotificationRegisteredEvent> {
  constructor() {}

  handle(event: NotificationRegisteredEvent) {
    console.log('handle logic for NotificationRegisteredEvent');
    console.log(event);
  }
}