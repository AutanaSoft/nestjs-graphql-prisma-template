import { LoggerModule } from '@core/logger/logger.module'
import { Module } from '@nestjs/common'

import { HomeController } from './home.controller'

@Module({
  imports: [LoggerModule],
  controllers: [HomeController],
})
export class HomeModule {}
