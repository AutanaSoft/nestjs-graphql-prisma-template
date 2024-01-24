import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '@src/app.module'
import request from 'supertest'

export const HomeModuleTest = () => {
  describe('Home:', () => {
    let app: NestFastifyApplication

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile()

      app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
      await app.init()
      await app.getHttpAdapter().getInstance().ready()
    })

    afterAll(async () => {
      await app.close()
    })

    it('should return status ok', () => {
      return request(app.getHttpServer()).get('/home').expect(200).expect({ status: 'ok' })
    })
  })
}
