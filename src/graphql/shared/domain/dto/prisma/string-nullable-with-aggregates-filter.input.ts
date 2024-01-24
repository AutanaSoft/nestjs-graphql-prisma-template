import { Field, InputType } from '@nestjs/graphql'

import { IntNullableFilter } from './int-nullable-filter.input'
import { QueryMode } from './query-mode.enum'
import { StringNullableFilter } from './string-nullable-filter.input'

@InputType()
export class StringNullableWithAggregatesFilter {
  @Field(() => String, { nullable: true })
  equals?: string;

  @Field(() => [String], { nullable: true })
  in?: Array<string>

  @Field(() => [String], { nullable: true })
  notIn?: Array<string>

  @Field(() => String, { nullable: true })
  lt?: string

  @Field(() => String, { nullable: true })
  lte?: string

  @Field(() => String, { nullable: true })
  gt?: string

  @Field(() => String, { nullable: true })
  gte?: string

  @Field(() => String, { nullable: true })
  contains?: string

  @Field(() => String, { nullable: true })
  startsWith?: string

  @Field(() => String, { nullable: true })
  endsWith?: string

  @Field(() => QueryMode, { nullable: true })
  mode?: keyof typeof QueryMode

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  not?: StringNullableWithAggregatesFilter

  @Field(() => IntNullableFilter, { nullable: true })
  _count?: IntNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  _min?: StringNullableFilter

  @Field(() => StringNullableFilter, { nullable: true })
  _max?: StringNullableFilter
}
