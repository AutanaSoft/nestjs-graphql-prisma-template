import { Field, InputType } from '@nestjs/graphql'
import {
  DateTimeFilter,
  EnumUserRolesFilter,
  EnumUserStatusFilter,
  StringFilter,
  StringNullableFilter,
} from '@src/graphql/shared/domain/dto/prisma'

import { UserModelWhereInput } from './user-model-where.input'

@InputType()
export class UserModelWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string

  @Field(() => String, { nullable: true })
  email?: string

  @Field(() => [UserModelWhereInput], { nullable: true })
  AND?: Array<UserModelWhereInput>

  @Field(() => [UserModelWhereInput], { nullable: true })
  OR?: Array<UserModelWhereInput>

  @Field(() => [UserModelWhereInput], { nullable: true })
  NOT?: Array<UserModelWhereInput>

  @Field(() => EnumUserStatusFilter, { nullable: true })
  status?: EnumUserStatusFilter

  @Field(() => EnumUserRolesFilter, { nullable: true })
  roles?: EnumUserRolesFilter

  @Field(() => StringNullableFilter, { nullable: true })
  userName?: StringNullableFilter

  @Field(() => StringFilter, { nullable: true })
  password?: StringFilter

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter

  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt?: DateTimeFilter
}
