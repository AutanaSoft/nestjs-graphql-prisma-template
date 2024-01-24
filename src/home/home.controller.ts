import { Controller, Get, HttpCode, Inject, Logger } from '@nestjs/common'

@Controller('home')
export class HomeController {
  constructor(@Inject(Logger) private readonly logger: Logger) {}

  @Get()
  @HttpCode(200)
  run() {
    this.logger.log('Home endpoint called!')
    return { status: 'ok' }
  }
}
