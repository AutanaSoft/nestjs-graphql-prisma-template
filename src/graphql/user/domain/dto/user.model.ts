import { Field, HideField, ID, ObjectType } from '@nestjs/graphql'
import { UserRoles, UserStatus } from '@prisma/client'

@ObjectType()
export class UserModel {
  @Field(() => ID, { nullable: false })
  id!: string

  @Field(() => UserStatus, { nullable: false, defaultValue: 'REGISTERED' })
  status!: keyof typeof UserStatus

  @Field(() => [UserRoles], { nullable: true })
  roles!: Array<keyof typeof UserRoles>

  @Field(() => String, { nullable: false })
  email!: string

  @Field(() => String, { nullable: true })
  userName!: string | null

  @HideField()
  password!: string

  @Field(() => Date, { nullable: false })
  createdAt!: Date

  @Field(() => Date, { nullable: false })
  updatedAt!: Date
}
