import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { UserRoles } from '@prisma/client'
import { UserModel } from '@src/graphql/user/domain/dto/user.model'

import { ROLES_KEY } from '../decorators/check-user-roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    const ctx = GqlExecutionContext.create(context)

    const user = ctx.getContext().req.user as UserModel

    // We check if the user is an admin
    if (user.roles.includes(UserRoles.ADMIN)) return true
    // We check if the user has the required role
    return requiredRoles.some(role => user.roles.includes(role as UserRoles))
  }
}
