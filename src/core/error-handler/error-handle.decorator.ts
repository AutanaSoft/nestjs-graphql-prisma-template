import { Inject } from '@nestjs/common'

import { ErrorHandlerService } from './error-handler.service'

export function HandleError() {
  const injectErrorHandlerService = Inject(ErrorHandlerService) // creates a function that injects a Logger into the decorated class

  return (target: object, propertyKey: string, propertyDescriptor: PropertyDescriptor) => {
    injectErrorHandlerService(target, 'errorHandlerService') // this is the same as using constructor(private readonly logger: LoggerService) in a class

    const originalMethod = propertyDescriptor.value

    propertyDescriptor.value = async function (...args: unknown[]) {
      try {
        return await originalMethod.apply(this, args)
      } catch (error) {
        const errorHandlerService: ErrorHandlerService = (
          this as { errorHandlerService: ErrorHandlerService }
        ).errorHandlerService

        return errorHandlerService.handle(error)
      }
    }

    return propertyDescriptor
  }
}
