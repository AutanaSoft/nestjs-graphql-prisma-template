import { Field, InputType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { Transform, Type } from 'class-transformer'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'

@InputType()
export class DecimalFilter {
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

  @Field(() => DecimalFilter, { nullable: true })
  not?: DecimalFilter
}
