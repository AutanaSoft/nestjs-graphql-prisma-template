import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Prisma } from '@prisma/client'
import * as fs from 'fs'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { TokenPayload } from '../../../../graphql/auth/domain/dto/token-payload.dto'
import { PrismaService } from '../../../../core/prisma/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly userRepository: Prisma.UserModelDelegate
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: fs.readFileSync(configService.get<string>('JWT_PUBLIC_KEY') || '').toString(),
      algorithms: 'RS512',
    })
    this.userRepository = this.prisma.userModel
  }

  validate = async (payload: TokenPayload) => {
    if (!payload) return null
    const { id } = payload
    return await this.userRepository.findUnique({ where: { id } })
  }
}
