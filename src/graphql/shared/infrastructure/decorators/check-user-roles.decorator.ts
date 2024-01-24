import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { UserRoles } from '@prisma/client'

import { RolesGuard } from '../guard/roles.guard'

export const ROLES_KEY = 'roles'

export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles)

export function CheckRoles(...roles: UserRoles[]) {
  return applyDecorators(Roles(...roles), UseGuards(RolesGuard))
}
