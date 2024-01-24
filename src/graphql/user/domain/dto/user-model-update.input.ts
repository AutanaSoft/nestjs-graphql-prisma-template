import { Field, InputType } from '@nestjs/graphql'
import { UserRoles, UserStatus } from '@prisma/client'
import { Transform } from 'class-transformer'
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

@InputType()
export class UserModelUpdateInput {
  @Field(() => UserStatus, { nullable: true })
  @IsEnum(UserStatus)
  @IsOptional()
  status?: keyof typeof UserStatus

  @Field(() => [UserRoles], { nullable: true })
  @IsEnum(UserRoles)
  @IsOptional()
  roles?: Array<keyof typeof UserRoles>

  @Field(() => String, { nullable: true })
  @IsEmail()
  @MinLength(8)
  @MaxLength(60)
  @IsOptional()
  @Transform(({ value }) => value.trim().toLowerCase())
  email?: string

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  userName?: string
}
