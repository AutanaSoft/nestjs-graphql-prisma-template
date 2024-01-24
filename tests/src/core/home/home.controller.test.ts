import { createMock } from '@golevelup/ts-jest'
import { Logger } from '@nestjs/common'
import { HomeController } from '@src/home/home.controller'

describe('HealthController', () => {
  let homeController: HomeController
  let logger: jest.Mocked<Logger>

  beforeEach(() => {
    logger = createMock<Logger>()
    homeController = new HomeController(logger)
  })

  describe('run', () => {
    it('should return is healthy', () => {
      expect(homeController.run()).toEqual({ status: 'ok' })
      expect(logger.log).toHaveBeenCalledTimes(1)
    })
  })
})
