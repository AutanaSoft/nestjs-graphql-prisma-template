import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '@src/app.module'
import { PrismaService } from '@src/core/prisma/prisma.service'
import { createAdminUser, deleteAllTestUsers } from '../core/test-utils'
import { AuthModuleTest } from './graphql/auth/auth.module'
import { UserModuleTest } from './graphql/user/user.module'
import { HomeModuleTest } from './home/home.module'

describe('App Test:', () => {
  let app: NestFastifyApplication
  let prismaService: PrismaService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
    await app.init()
    await app.getHttpAdapter().getInstance().ready()
    prismaService = app.get<PrismaService>(PrismaService)
    await createAdminUser(prismaService)
  })

  afterAll(async () => {
    await deleteAllTestUsers(prismaService)
    await app.close()
  })
  describe('HomeModule:', HomeModuleTest)
  describe('AuthModule:', AuthModuleTest)
  describe('UserModule:', UserModuleTest)
})
