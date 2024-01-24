import { Field, InputType } from '@nestjs/graphql'
import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

@InputType()
export class UserModelCreateInput {
  @Field(() => String, { nullable: false })
  @IsEmail()
  @MinLength(8)
  @MaxLength(60)
  @Transform(({ value }) => value.trim().toLowerCase())
  email!: string

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  userName!: string

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password!: string

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  confirmPassword?: string
}
