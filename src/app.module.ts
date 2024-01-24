import { ErrorHandlerModule } from '@core/error-handler/error-handler.module'
import { LoggerModule } from '@core/logger/logger.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HomeModule } from '@src/home/home.module'
import { GraphqlModule } from '@src/graphql/graphql.module'
import { PrismaModule } from '@src/core/prisma/prisma.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    HomeModule,
    LoggerModule,
    ErrorHandlerModule,
    PrismaModule,
    GraphqlModule,
  ],
  providers: [],
})
export class AppModule {}
