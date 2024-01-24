import { Field, InputType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { Transform, Type } from 'class-transformer'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'

import { DecimalFilter } from './decimal-filter.input'
import { IntFilter } from './int-filter.input'

@InputType()
export class DecimalWithAggregatesFilter {
  @Field(() => GraphQLDecimal, { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  equals?: Decimal;

  @Field(() => [GraphQLDecimal], { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  in?: Array<Decimal>

  @Field(() => [GraphQLDecimal], { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  notIn?: Array<Decimal>

  @Field(() => GraphQLDecimal, { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  lt?: Decimal

  @Field(() => GraphQLDecimal, { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  lte?: Decimal

  @Field(() => GraphQLDecimal, { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  gt?: Decimal

  @Field(() => GraphQLDecimal, { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  gte?: Decimal

  @Field(() => DecimalWithAggregatesFilter, { nullable: true })
  not?: DecimalWithAggregatesFilter

  @Field(() => IntFilter, { nullable: true })
  _count?: IntFilter

  @Field(() => DecimalFilter, { nullable: true })
  _avg?: DecimalFilter

  @Field(() => DecimalFilter, { nullable: true })
  _sum?: DecimalFilter

  @Field(() => DecimalFilter, { nullable: true })
  _min?: DecimalFilter

  @Field(() => DecimalFilter, { nullable: true })
  _max?: DecimalFilter
}
