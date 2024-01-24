import { Module } from '@nestjs/common'
import { ErrorHandlerModule } from '@src/core/error-handler/error-handler.module'
import { ErrorHandlerService } from '@src/core/error-handler/error-handler.service'
import { PrismaModule } from '@src/core/prisma/prisma.module'

import { PubSubService } from '../shared/services/pub-sub.service'
import { UserResolver } from './resolvers/user.resolver'
import { UserService } from './services/user.service'

@Module({
  imports: [PrismaModule, ErrorHandlerModule],
  providers: [UserService, UserResolver, PubSubService, ErrorHandlerService],
  exports: [UserService],
})
export class UserModule {}
