import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-type-json'

@InputType()
export class JsonFilter {
  @Field(() => GraphQLJSON, { nullable: true })
  equals?: never

  @Field(() => [String], { nullable: true })
  path?: Array<string>

  @Field(() => String, { nullable: true })
  string_contains?: string

  @Field(() => String, { nullable: true })
  string_starts_with?: string

  @Field(() => String, { nullable: true })
  string_ends_with?: string

  @Field(() => GraphQLJSON, { nullable: true })
  array_contains?: never

  @Field(() => GraphQLJSON, { nullable: true })
  array_starts_with?: never

  @Field(() => GraphQLJSON, { nullable: true })
  array_ends_with?: never

  @Field(() => GraphQLJSON, { nullable: true })
  lt?: never

  @Field(() => GraphQLJSON, { nullable: true })
  lte?: never

  @Field(() => GraphQLJSON, { nullable: true })
  gt?: never

  @Field(() => GraphQLJSON, { nullable: true })
  gte?: never

  @Field(() => GraphQLJSON, { nullable: true })
  not?: never
}
