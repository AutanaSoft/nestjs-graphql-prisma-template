import { ArgsType, Field } from '@nestjs/graphql'
import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

@ArgsType()
export class SignInInput {
  @Field(() => String, { nullable: false })
  @MaxLength(60)
  @MinLength(8)
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email!: string

  @Field(() => String, { nullable: false })
  @MaxLength(16)
  @MinLength(8)
  @IsNotEmpty()
  @IsString()
  password!: string
}
