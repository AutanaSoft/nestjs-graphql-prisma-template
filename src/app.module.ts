import { ErrorHandlerModule } from '@core/error-handler/error-handler.module'
import { LoggerModule } from '@core/logger/logger.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule, seconds } from '@nestjs/throttler'
import { PrismaModule } from '@src/core/prisma/prisma.module'
import { GraphqlModule } from '@src/graphql/graphql.module'
import { HomeModule } from '@src/home/home.module'
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: seconds(60),
          limit: 100,
        },
      ],
    }),
    HomeModule,
    LoggerModule,
    ErrorHandlerModule,
    PrismaModule,
    GraphqlModule,
  ],
  providers: [],
})
export class AppModule {}
