import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UserModel } from '@src/graphql/user/domain/dto/user.model'

import { AccessToken } from '../domain/dto/access-token.dto '
import { TokenPayload } from '../domain/dto/token-payload.dto'

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  /**
   * Generates an access token for the given user payload.
   * @param payload - The user payload.
   * @returns The generated access token along with its creation and expiration dates.
   */
  public generateToken(payload: UserModel): AccessToken {
    const { id, email, userName } = payload
    const token = this.jwtService.sign({ id, email, userName })

    return {
      token,
      createdAt: new Date(),
      expiresAt: new Date(
        Date.now() + (this.config.get<number>('JWT_EXPIRES_IN_MINUTES') ?? 60) * 60 * 1000,
      ),
    }
  }

  /**
   * Verifies the given token and returns the decoded payload.
   * @param token - The token to be verified.
   * @returns The decoded payload of the token.
   */
  public verifyToken(token: string): TokenPayload {
    return this.jwtService.verify(token)
  }
}
