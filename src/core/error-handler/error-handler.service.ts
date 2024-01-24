import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common'
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library'
import { GraphQLError } from 'graphql'

@Injectable()
export class ErrorHandlerService {
  private readonly name = ErrorHandlerService.name

  constructor(@Inject(Logger) private readonly logger: Logger) {}

  /**
   * Converts an error to a GraphQLError object.
   * @param error - The error to convert.
   * @returns The converted GraphQLError object.
   */
  handle(error: Error | unknown): GraphQLError {
    if (error instanceof GraphQLError) return error

    if (error instanceof PrismaClientKnownRequestError) {
      return new GraphQLError(error.message.replace('Entity', ''), {
        extensions: {
          status: 'KNOWN_REQUEST_ERROR',
          code: error.code,
          arguments: error.meta ?? error.name,
          errors: error,
        },
      })
    }

    if (error instanceof PrismaClientUnknownRequestError) {
      return new GraphQLError(error.message.replace('Entity', ''), {
        extensions: {
          status: 'UNKNOWN_REQUEST_ERROR',
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          arguments: error.name,
          errors: error,
        },
      })
    }

    if (error instanceof PrismaClientValidationError) {
      return new GraphQLError(error.message.replace('Entity', ''), {
        extensions: {
          status: 'VALIDATION_ERRO',
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          arguments: error.name,
          errors: error,
        },
      })
    }

    this.logger.log(error, this.name)

    return new GraphQLError('unknown error', {
      extensions: {
        status: 'INTERNAL_SERVER_ERROR',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        errors: error,
      },
    })
  }
}
