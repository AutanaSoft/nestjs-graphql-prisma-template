import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { UserRoles } from '@prisma/client'

registerEnumType(UserRoles, { name: 'UserRoles' })

@InputType()
export class EnumUserRolesFilter {
  @Field(() => [UserRoles], { nullable: true })
  equals?: Array<keyof typeof UserRoles>

  @Field(() => UserRoles, { nullable: true })
  has?: keyof typeof UserRoles

  @Field(() => [UserRoles], { nullable: true })
  hasEvery?: Array<keyof typeof UserRoles>

  @Field(() => [UserRoles], { nullable: true })
  hasSome?: Array<keyof typeof UserRoles>

  @Field(() => Boolean, { nullable: true })
  isEmpty?: boolean
}
