import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AccessToken {
  @Field(() => String, { nullable: false })
  token!: string

  @Field(() => Date, { nullable: true })
  expiresAt?: Date

  @Field(() => Date, { nullable: true })
  createdAt?: Date
}
