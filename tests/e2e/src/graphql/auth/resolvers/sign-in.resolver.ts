import request from 'supertest'

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '@src/app.module'
import { PrismaService } from '@src/core/prisma/prisma.service'
import { userTest } from '../../../../core/test-utils'

const user = userTest

export const SignInTests = () => {
  let app: NestFastifyApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
    prisma = app.get<PrismaService>(PrismaService)
    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  afterAll(async () => {
    await prisma.userModel.delete({ where: { email: user.email } })
    await app.close()
  })

  it('sending an incorrect email, it should return invalid credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query:
          'query SignIn($email: String!, $password: String!) {\r\n  signIn(email: $email, password: $password) {\r\n    token\r\n    createdAt\r\n    expiresAt\r\n  }\r\n}',
        variables: { email: 'no-email@test.com', password: user.password },
        operationName: 'SignIn',
      })
      .expect(200)
    const { body } = response
    expect(body.errors).toBeDefined()
    expect(body.errors[0]).toBeDefined()
    const error = body.errors[0]
    expect(error.path[0]).toBe('signIn')
    expect(error.message).toBe('Invalid Credentials')
    expect(error.extensions).toBeDefined()
    expect(error.extensions.status).toBe(401)
    expect(error.extensions.code).toBe('INVALID_CREDENTIALS')
  })

  it('sending an incorrect password, it should return invalid credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query:
          'query SignIn($email: String!, $password: String!) {\r\n  signIn(email: $email, password: $password) {\r\n    token\r\n    createdAt\r\n    expiresAt\r\n  }\r\n}',
        variables: { email: user.email, password: 'null-password' },
        operationName: 'SignIn',
      })
      .expect(200)
    const { body } = response
    expect(body.errors).toBeDefined()
    expect(body.errors[0]).toBeDefined()
    const error = body.errors[0]
    expect(error.path[0]).toBe('signIn')
    expect(error.message).toBe('Invalid Credentials')
    expect(error.extensions).toBeDefined()
    expect(error.extensions.status).toBe(401)
    expect(error.extensions.code).toBe('INVALID_CREDENTIALS')
  })

  it('should return a AccessToken', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query:
          'query SignIn($email: String!, $password: String!) {\r\n  signIn(email: $email, password: $password) {\r\n    token\r\n    createdAt\r\n    expiresAt\r\n  }\r\n}',
        variables: { email: user.email, password: user.password },
        operationName: 'SignIn',
      })
      .expect(200)
    const { body } = response
    expect(body.data).toBeDefined()
    expect(body.data.signIn).toBeDefined()
    expect(body.data.signIn.token).toBeDefined()
    expect(body.data.signIn.createdAt).toBeDefined()
    expect(body.data.signIn.expiresAt).toBeDefined()
  })
}
