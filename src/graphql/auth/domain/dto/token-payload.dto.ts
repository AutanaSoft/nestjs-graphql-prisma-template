import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'Payload of token' })
export class TokenPayload {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => String, { nullable: false })
  email!: string

  @Field(() => String, { nullable: false })
  userName!: string

  @Field(() => Number, { nullable: false })
  iat?: number

  @Field(() => Number, { nullable: false })
  exp?: number

  constructor(partial: Partial<TokenPayload>) {
    Object.assign(this, partial)
  }
}
