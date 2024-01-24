import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '@src/app.module'
import { TokenService } from '@src/graphql/auth/services/token.service'
import { PrismaService } from '@src/core/prisma/prisma.service'
import request from 'supertest'
import { adminTest, getAdminToken, userTest } from '../../../../core/test-utils'

export const CreateUserTest = () => {
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

  it('only administrators can create a user, should return Unauthorized', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query:
          'mutation CreateUser($data: UserModelCreateInput!) {\r\n  createUser(data: $data) {\r\n    createdAt\r\n    email\r\n    id\r\n    roles\r\n    status\r\n    updatedAt\r\n    userName\r\n  }\r\n}',
        variables: {
          data: {
            email: userTest.email,
            userName: userTest.userName,
            password: userTest.password,
            confirmPassword: userTest.password,
          },
        },
        operationName: 'CreateUser',
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

  it('with an already registered email, should return email or username already exists', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', token)
      .send({
        query:
          'mutation CreateUser($data: UserModelCreateInput!) {\r\n  createUser(data: $data) {\r\n    createdAt\r\n    email\r\n    id\r\n    roles\r\n    status\r\n    updatedAt\r\n    userName\r\n  }\r\n}',
        variables: {
          data: {
            email: adminTest.email,
            userName: userTest.userName,
            password: userTest.password,
            confirmPassword: userTest.password,
          },
        },
        operationName: 'CreateUser',
      })
      .expect(200)
    const { body } = response
    expect(body.errors).toBeDefined()
    expect(body.errors[0]).toBeDefined()
    const error = body.errors[0]
    expect(error.message).toBe('email or username already exists')
    expect(error.extensions).toBeDefined()
    expect(error.extensions.code).toBe('EMAIL_OR_USERNAME_ALREADY_EXISTS')
    expect(error.extensions.status).toBe(409)
  })

  it('with an already registered userName, should return email or username already exists', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', token)
      .send({
        query:
          'mutation CreateUser($data: UserModelCreateInput!) {\r\n  createUser(data: $data) {\r\n    createdAt\r\n    email\r\n    id\r\n    roles\r\n    status\r\n    updatedAt\r\n    userName\r\n  }\r\n}',
        variables: {
          data: {
            email: userTest.email,
            userName: adminTest.userName,
            password: userTest.password,
            confirmPassword: userTest.password,
          },
        },
        operationName: 'CreateUser',
      })
      .expect(200)
    const { body } = response
    expect(body.errors).toBeDefined()
    expect(body.errors[0]).toBeDefined()
    const error = body.errors[0]
    expect(error.message).toBe('email or username already exists')
    expect(error.extensions).toBeDefined()
    expect(error.extensions.code).toBe('EMAIL_OR_USERNAME_ALREADY_EXISTS')
    expect(error.extensions.status).toBe(409)
  })

  it('with different password, should return password and confirmPassword are not equal', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', token)
      .send({
        query:
          'mutation CreateUser($data: UserModelCreateInput!) {\r\n  createUser(data: $data) {\r\n    createdAt\r\n    email\r\n    id\r\n    roles\r\n    status\r\n    updatedAt\r\n    userName\r\n  }\r\n}',
        variables: {
          data: {
            email: userTest.email,
            userName: userTest.userName,
            password: userTest.password,
            confirmPassword: 'notEqual',
          },
        },
        operationName: 'CreateUser',
      })
      .expect(200)
    const { body } = response
    expect(body.errors).toBeDefined()
    expect(body.errors[0]).toBeDefined()
    const error = body.errors[0]
    expect(error.message).toBe('password and confirmPassword are not equal')
    expect(error.extensions).toBeDefined()
    expect(error.extensions.code).toBe('PASSWORD_NOT_EQUAL')
    expect(error.extensions.status).toBe(409)
  })

  it('Create User, should return createUser Model', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', token)
      .send({
        query:
          'mutation CreateUser($data: UserModelCreateInput!) {\r\n  createUser(data: $data) {\r\n    createdAt\r\n    email\r\n    id\r\n    roles\r\n    status\r\n    updatedAt\r\n    userName\r\n  }\r\n}',
        variables: {
          data: {
            email: userTest.email,
            userName: userTest.userName,
            password: userTest.password,
            confirmPassword: userTest.password,
          },
        },
        operationName: 'CreateUser',
      })
      .expect(200)
    const { body } = response
    expect(200)
    expect(body.data).toBeDefined()
    const data = body.data
    expect(data.createUser).toBeDefined()
    expect(data.createUser.id).toBeDefined()
    expect(data.createUser.email).toBe(userTest.email)
  })
}
