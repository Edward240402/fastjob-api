import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { PostRegisteredEvent } from "../../../domain/events/post-registered.event";

@EventsHandler(PostRegisteredEvent)
export class PostRegisteredHandler implements IEventHandler<PostRegisteredEvent> {
  constructor() {}

  handle(event: PostRegisteredEvent) {
    console.log('handle logic for PostRegisteredEvent');
    console.log(event);
  }
}