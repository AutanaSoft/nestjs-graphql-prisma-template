import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'

import { AccessToken } from '../domain/dto/access-token.dto '
import { SignInInput } from '../domain/dto/sign-in-input.dto'
import { SignUpInput } from '../domain/dto/sign-up-input.dto'
import { AuthService } from '../services/auth.service'
@Resolver(AccessToken)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  /**
   * Sign in with the provided input.
   * @param input - The sign-in input.
   * @returns A promise that resolves to an AccessToken or a GraphQLError.
   */
  @Query(() => AccessToken)
  async signIn(@Args() input: SignInInput): Promise<AccessToken | GraphQLError> {
    return await this.authService.signIn(input)
  }

  @Mutation(() => AccessToken)
  /**
   * Sign up a user.
   * @param input - The sign up input.
   * @returns A promise that resolves to an AccessToken or a GraphQLError.
   */
  async signUp(@Args() input: SignUpInput): Promise<AccessToken | GraphQLError> {
    return this.authService.signUp(input)
  }
}
