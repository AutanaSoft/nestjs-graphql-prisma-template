import { ArgsType, Field } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { UserModelUpdateInput } from './user-model-update.input'
import { UserModelWhereUniqueInput } from './user-model-where-unique.input'

@ArgsType()
export class UpdateOneUserModelArgs {
  @Field(() => UserModelUpdateInput, { nullable: false })
  @Type(() => UserModelUpdateInput)
  @ValidateNested()
  data!: UserModelUpdateInput

  @Field(() => UserModelWhereUniqueInput, { nullable: false })
  @Type(() => UserModelWhereUniqueInput)
  @ValidateNested()
  where!: Prisma.AtLeast<UserModelWhereUniqueInput, 'id' | 'email'>
}
