import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ErrorHandlerModule } from '@core/error-handler/error-handler.module'
import { LoggerModule } from '@core/logger/logger.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { ThrottlerModule, seconds } from '@nestjs/throttler'
import { PrismaModule } from '@src/core/prisma/prisma.module'
import { join } from 'node:path'
import { GraphqlModule } from './graphql/graphql.module'
import { GqlThrottlerGuard } from './graphql/shared/infrastructure/guard/GqlThrottlerGuard'
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
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => ({
        cors: { origin: true, credentials: true },
        path: config.get<string>('GRAPHQL_PATH'),
        debug: config.get<boolean>('GRAPHQL_DEBUG'),
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
        sortSchema: true,
        subscriptions: {
          'graphql-ws': true,
        },
        context: (request: any, reply: any) => ({ request, reply }),
      }),
      inject: [ConfigService],
    }),
    LoggerModule,
    ErrorHandlerModule,
    PrismaModule,
    GraphqlModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class AppModule {}
