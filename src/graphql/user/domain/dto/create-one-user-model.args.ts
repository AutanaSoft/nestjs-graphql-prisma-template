import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { UserModelCreateInput } from './user-model-create.input'

@ArgsType()
export class CreateOneUserModelArgs {
  @Field(() => UserModelCreateInput, { nullable: false })
  @Type(() => UserModelCreateInput)
  @ValidateNested()
  data!: UserModelCreateInput
}
