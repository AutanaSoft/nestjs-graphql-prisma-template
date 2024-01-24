import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserRoles } from '@prisma/client'
import { CheckRoles } from '@src/graphql/shared/infrastructure/decorators/check-user-roles.decorator'
import { User } from '@src/graphql/shared/infrastructure/decorators/get-user.decorator'
import { JwtAuthGuard } from '@src/graphql/shared/infrastructure/guard/jwt-auth.guard'
import { PubSubService } from '@src/graphql/shared/services/pub-sub.service'
import { GraphQLError } from 'graphql'
import { CreateOneUserModelArgs } from '../domain/dto/create-one-user-model.args'
import { UpdateOneUserModelArgs } from '../domain/dto/update-one-user-model.args'
import { UserModel } from '../domain/dto/user.model'
import { UserService } from '../services/user.service'

@UseGuards(JwtAuthGuard)
@Resolver(UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly pubSub: PubSubService,
  ) {}

  /**
   * Creates a new user.
   * @param args The arguments for creating the user.
   * @returns A promise that resolves to the created user or a GraphQLError.
   */
  @Mutation(() => UserModel)
  @CheckRoles(UserRoles.ADMIN)
  async createUser(@Args() args: CreateOneUserModelArgs): Promise<UserModel | GraphQLError> {
    return this.userService.create(args)
  }

  /**
   * Updates a user.
   * @param args The arguments for updating a user.
   * @returns A promise that resolves to the updated user or a GraphQLError.
   */
  @Mutation(() => UserModel)
  async updateUser(@Args() args: UpdateOneUserModelArgs): Promise<UserModel | GraphQLError> {
    return this.userService.update(args)
  }

  /**
   * Retrieves the currently authenticated user.
   * @param user - The authenticated user.
   * @returns A Promise that resolves to the authenticated user or a GraphQLError.
   */
  @Query(() => UserModel)
  async me(@User() user: UserModel): Promise<UserModel | GraphQLError> {
    return this.userService.me(user)
  }
}
