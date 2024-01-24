import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { UserStatus } from '@prisma/client'

registerEnumType(UserStatus, { name: 'UserStatus' })

@InputType()
export class EnumUserStatusFilter {
  @Field(() => UserStatus, { nullable: true })
  equals?: keyof typeof UserStatus;

  @Field(() => [UserStatus], { nullable: true })
  in?: Array<keyof typeof UserStatus>

  @Field(() => [UserStatus], { nullable: true })
  notIn?: Array<keyof typeof UserStatus>

  @Field(() => EnumUserStatusFilter, { nullable: true })
  not?: EnumUserStatusFilter
}
