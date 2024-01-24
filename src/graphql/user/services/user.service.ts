import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import { Prisma, UserModel } from '@prisma/client'
import { HandleError } from '@src/core/error-handler/error-handle.decorator'
import { PrismaService } from '@src/core/prisma/prisma.service'
import { PUB_SUB_USER } from '@src/graphql/shared/domain/constants/pub-sub/user'
import { PubSubService } from '@src/graphql/shared/services/pub-sub.service'
import { hashField } from '@src/graphql/shared/utils/hashField'
import { GraphQLError } from 'graphql'

import { CreateOneUserModelArgs } from '../domain/dto/create-one-user-model.args'
import { UpdateOneUserModelArgs } from '../domain/dto/update-one-user-model.args'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)
  private readonly repository: Prisma.UserModelDelegate

  constructor(
    private readonly prisma: PrismaService,
    private readonly pubSub: PubSubService,
  ) {
    this.repository = this.prisma.userModel
  }

  /**
   * Creates a new user.
   * @param params - The parameters for creating the user.
   * @returns A promise that resolves to the created user or a GraphQLError.
   */
  @HandleError()
  async create(params: CreateOneUserModelArgs): Promise<UserModel | GraphQLError> {
    const exist = await this.repository.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: params.data.email,
              mode: 'insensitive',
            },
          },
          {
            userName: {
              equals: params.data.userName,
              mode: 'insensitive',
            },
          },
        ],
      },
    })

    if (exist) {
      throw new GraphQLError('email or username already exists', {
        extensions: {
          code: 'EMAIL_OR_USERNAME_ALREADY_EXISTS',
          status: HttpStatus.CONFLICT,
        },
      })
    }

    if (params.data.password !== params.data.confirmPassword) {
      throw new GraphQLError('password and confirmPassword are not equal', {
        extensions: {
          code: 'PASSWORD_NOT_EQUAL',
          status: HttpStatus.CONFLICT,
        },
      })
    }

    // delete params.data.confirmPassword;
    delete params.data.confirmPassword
    params.data.password = hashField(params.data.password)

    return await this.repository.create(params)
  }

  /**
   * Updates a user based on the provided parameters.
   * If the password is provided in the parameters, it will be hashed before updating.
   * Publishes the update event using PubSub.
   * @param params - The parameters for updating the user.
   * @returns A Promise that resolves to the updated user or a GraphQLError if an error occurs.
   */
  @HandleError()
  async update(params: UpdateOneUserModelArgs): Promise<UserModel | GraphQLError> {
    const exist = await this.repository.findFirst({
      where: params.where,
    })

    if (!exist) {
      throw new GraphQLError('user not found', {
        extensions: {
          code: 'USER_NOT_FOUND',
          status: HttpStatus.NOT_FOUND,
        },
      })
    }

    const update = await this.repository.update(params)

    await this.pubSub.publish(PUB_SUB_USER.UPDATES, {
      [PUB_SUB_USER.UPDATES]: update,
    })

    return update
  }

  /**
   * Retrieves the user information for the authenticated user.
   * @param params - The authenticated user.
   * @returns A promise that resolves to the user information or a GraphQLError if an error occurs.
   */
  @HandleError()
  async me(params: UserModel): Promise<UserModel | GraphQLError> {
    const { id } = params
    const user = await this.repository.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new GraphQLError('user not found', {
        extensions: {
          code: 'USER_NOT_FOUND',
          status: HttpStatus.NOT_FOUND,
        },
      })
    }

    return user
  }
}
