import { Injectable } from '@nestjs/common'
import { HandleError } from '@src/core/error-handler/error-handle.decorator'
import { GraphQLError } from 'graphql'
import { PubSub } from 'graphql-subscriptions'

@Injectable()
export class PubSubService {
  private pubSub: PubSub

  constructor() {
    this.pubSub = new PubSub()
  }

  @HandleError()
  async publish(
    triggerName: string,
    payload: Record<string, unknown>,
  ): Promise<void | GraphQLError | AsyncIterator<never>> {
    await this.pubSub.publish(triggerName, payload)
  }

  @HandleError()
  asyncIterator<T>(triggers: string | string[]): AsyncIterator<T> | GraphQLError {
    return this.pubSub.asyncIterator<T>(triggers)
  }
}
