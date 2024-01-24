import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ErrorHandlerModule } from '@src/core/error-handler/error-handler.module'
import { join } from 'path'

import { AuthModule } from './auth/auth.module'
import { PubSubService } from './shared/services/pub-sub.service'
import { UserModule } from './user/user.module'
@Module({
  imports: [
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
      }),
      inject: [ConfigService],
    }),
    ErrorHandlerModule,
    UserModule,
    AuthModule,
  ],
  providers: [PubSubService],
  exports: [],
})
export class GraphqlModule {}
