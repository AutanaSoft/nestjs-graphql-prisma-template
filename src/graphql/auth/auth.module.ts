import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ErrorHandlerModule } from '@src/core/error-handler/error-handler.module'
import { PrismaModule } from '@src/core/prisma/prisma.module'
import * as fs from 'fs'

import { JwtStrategy } from '../shared/infrastructure/strategies/jwt-headers.strategy'
import { UserModule } from '../user/user.module'
import { AuthResolver } from './resolvers/auth.resolver'
import { AuthService } from './services/auth.service'
import { TokenService } from './services/token.service'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        privateKey: fs.readFileSync(config.get<string>('JWT_PRIVATE_KEY') || '').toString(),
        publicKey: fs.readFileSync(config.get<string>('JWT_PUBLIC_KEY') || '').toString(),
        signOptions: {
          expiresIn: config.get<number>('JWT_EXPIRES_IN_MINUTES') + 'm',
          algorithm: 'RS512',
        },
      }),
    }),
    ErrorHandlerModule,
    PrismaModule,
    UserModule,
  ],
  providers: [JwtStrategy, AuthResolver, TokenService, AuthService],
})
export class AuthModule {}
