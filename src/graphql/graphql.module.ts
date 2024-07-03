import { Module } from '@nestjs/common'
import { ErrorHandlerModule } from '@src/core/error-handler/error-handler.module'

import { AuthModule } from './auth/auth.module'
import { PubSubService } from './shared/services/pub-sub.service'
import { UserModule } from './user/user.module'

@Module({
  imports: [ErrorHandlerModule, UserModule, AuthModule],
  exports: [],
  providers: [PubSubService],
})
export class GraphqlModule {}
