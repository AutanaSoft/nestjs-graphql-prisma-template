import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { HandleError } from '@src/core/error-handler/error-handle.decorator'
import { hashField, verifyHashedField } from '@src/graphql/shared/utils/hashField'
import { PrismaService } from '@src/core/prisma/prisma.service'
import { GraphQLError } from 'graphql'

import { AccessToken } from '../domain/dto/access-token.dto '
import { SignInInput } from '../domain/dto/sign-in-input.dto'
import { SignUpInput } from '../domain/dto/sign-up-input.dto'
import { TokenService } from './token.service'

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name)
  private readonly userRepository: Prisma.UserModelDelegate<DefaultArgs>

  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {
    this.userRepository = this.prisma.userModel
  }

  /**
   * Sign in a user with the provided credentials.
   * @param params - The sign-in input parameters.
   * @returns A promise that resolves to an AccessToken if the sign-in is successful, or a GraphQLError if the credentials are invalid.
   */
  @HandleError()
  async signIn(params: SignInInput): Promise<AccessToken | GraphQLError> {
    const { email, password } = params
    const user = await this.userRepository.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: email,
              mode: 'insensitive',
            },
          },
          {
            userName: {
              equals: email,
              mode: 'insensitive',
            },
          },
        ],
      },
    })

    if (!user || !verifyHashedField(password, user.password)) {
      throw new GraphQLError('Invalid Credentials', {
        extensions: {
          code: 'INVALID_CREDENTIALS',
          status: HttpStatus.UNAUTHORIZED,
        },
      })
    }

    return this.tokenService.generateToken(user)
  }

  /**
   * Signs up a user.
   * @param params - The sign up input parameters.
   * @returns A promise that resolves to an AccessToken or a GraphQLError.
   */
  @HandleError()
  async signUp(params: SignUpInput): Promise<AccessToken | GraphQLError> {
    if (params.password !== params.confirmPassword) {
      throw new GraphQLError('password and confirmPassword are not equal', {
        extensions: {
          code: 'PASSWORD_NOT_EQUAL',
          status: HttpStatus.CONFLICT,
        },
      })
    }

    const exist = await this.userRepository.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: params.email,
              mode: 'insensitive',
            },
          },
          {
            userName: {
              equals: params.userName,
              mode: 'insensitive',
            },
          },
        ],
      },
    })

    if (exist) {
      throw new GraphQLError('email or userName already exists', {
        extensions: {
          code: 'USER_ALREADY_EXISTS',
          status: HttpStatus.CONFLICT,
        },
      })
    }

    delete params.confirmPassword

    const user = await this.userRepository.create({
      data: {
        ...params,
        password: hashField(params.password),
      },
    })
    return this.tokenService.generateToken(user)
  }
}
