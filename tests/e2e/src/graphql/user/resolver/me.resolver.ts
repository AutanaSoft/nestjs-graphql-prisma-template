import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '@src/app.module'
import { TokenService } from '@src/graphql/auth/services/token.service'
import { PrismaService } from '@src/core/prisma/prisma.service'
import request from 'supertest'
import { adminTest, getAdminToken } from '../../../../core/test-utils'

export const MeTest = () => {
  let app: NestFastifyApplication
  let prismaService: PrismaService
  let tokenService: TokenService
  let token: string

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
    await app.init()
    await app.getHttpAdapter().getInstance().ready()
    prismaService = app.get<PrismaService>(PrismaService)
    tokenService = app.get<TokenService>(TokenService)
    token = await getAdminToken(prismaService, tokenService)
  })

  afterAll(async () => {
    await app.close()
  })

  it('authorized users only, should return Unauthorized', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query:
          'query Me {\r\n  me {\r\n    createdAt\r\n    email\r\n    id\r\n    roles\r\n    status\r\n    updatedAt\r\n    userName\r\n  }\r\n}',
        variables: {},
        operationName: 'Me',
      })
      .expect(200)
    const { body } = response
    expect(body.errors).toBeDefined()
    expect(body.errors[0]).toBeDefined()
    const error = body.errors[0]
    expect(error.message).toBe('Unauthorized')
    expect(error.extensions).toBeDefined()
    expect(error.extensions.code).toBe('UNAUTHENTICATED')
  })

  it('should return createUser Model', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', token)
      .send({
        query:
          'query Me {\r\n  me {\r\n    createdAt\r\n    email\r\n    id\r\n    roles\r\n    status\r\n    updatedAt\r\n    userName\r\n  }\r\n}',
        variables: {},
        operationName: 'Me',
      })
      .expect(200)
    const { body } = response
    expect(200)
    expect(body.data).toBeDefined()
    const data = body.data
    expect(data.me).toBeDefined()
    expect(data.me.id).toBeDefined()
    expect(data.me.email).toBe(adminTest.email)
  })
}
