import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

/**
 * Custom GraphQL authentication guard that extends the AuthGuard('jwt') class.
 * This guard is responsible for authenticating requests using JWT tokens.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context)
    const ctx = gqlCtx.getContext()
    return ctx.req
  }
}
