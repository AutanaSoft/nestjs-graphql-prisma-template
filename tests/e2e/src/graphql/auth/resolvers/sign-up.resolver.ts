import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '@src/app.module'
import request from 'supertest'
import { userTest } from '../../../../core/test-utils'

export const SignUpTests = () => {
  let app: NestFastifyApplication
  const user = userTest

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

  it('should return a AccessToken', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query:
          'mutation SignUp($confirmPassword: String!, $email: String!, $password: String!, $userName: String!) {\r\n  signUp(confirmPassword: $confirmPassword, email: $email, password: $password, userName: $userName) {\r\n    token\r\n    createdAt\r\n    expiresAt\r\n  }\r\n}',
        variables: {
          email: user.email,
          password: user.password,
          userName: user.userName,
          confirmPassword: user.password,
        },
        operationName: 'SignUp',
      })
      .expect(200)
    const { body } = response
    expect(body.data).toBeDefined()
    expect(body.data.signUp).toBeDefined()
    expect(body.data.signUp.token).toBeDefined()
    expect(body.data.signUp.createdAt).toBeDefined()
    expect(body.data.signUp.expiresAt).toBeDefined()
  })

  it('should return a email already exists', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query:
          'mutation SignUp($confirmPassword: String!, $email: String!, $password: String!, $userName: String!) {\r\n  signUp(confirmPassword: $confirmPassword, email: $email, password: $password, userName: $userName) {\r\n    token\r\n    createdAt\r\n    expiresAt\r\n  }\r\n}',
        variables: {
          email: user.email,
          password: user.password,
          userName: 'testUser2',
          confirmPassword: user.password,
        },
        operationName: 'SignUp',
      })
      .expect(200)
    const { body } = response
    expect(body.errors).toBeDefined()
    expect(body.errors[0]).toBeDefined()
    const error = body.errors[0]
    expect(error.path[0]).toBe('signUp')
    expect(error.message).toBe('email or userName already exists')
    expect(error.extensions).toBeDefined()
    expect(error.extensions.status).toBe(409)
    expect(error.extensions.code).toBe('USER_ALREADY_EXISTS')
  })

  it('should return a username already exists', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query:
          'mutation SignUp($confirmPassword: String!, $email: String!, $password: String!, $userName: String!) {\r\n  signUp(confirmPassword: $confirmPassword, email: $email, password: $password, userName: $userName) {\r\n    token\r\n    createdAt\r\n    expiresAt\r\n  }\r\n}',
        variables: {
          email: 'user-test2@test.com',
          password: user.password,
          userName: user.userName,
          confirmPassword: user.password,
        },
        operationName: 'SignUp',
      })
      .expect(200)
    const { body } = response
    expect(body.errors).toBeDefined()
    expect(body.errors[0]).toBeDefined()
    const error = body.errors[0]
    expect(error.path[0]).toBe('signUp')
    expect(error.message).toBe('email or userName already exists')
    expect(error.extensions).toBeDefined()
    expect(error.extensions.status).toBe(409)
    expect(error.extensions.code).toBe('USER_ALREADY_EXISTS')
  })

  it('should return a password are not equal', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query:
          'mutation SignUp($confirmPassword: String!, $email: String!, $password: String!, $userName: String!) {\r\n  signUp(confirmPassword: $confirmPassword, email: $email, password: $password, userName: $userName) {\r\n    token\r\n    createdAt\r\n    expiresAt\r\n  }\r\n}',
        variables: {
          email: 'user-test2@test.com',
          password: 'testPassword',
          userName: 'testUser2',
          confirmPassword: 'testPassword2',
        },
        operationName: 'SignUp',
      })
      .expect(200)
    const { body } = response
    expect(body.errors).toBeDefined()
    expect(body.errors[0]).toBeDefined()
    const error = body.errors[0]
    expect(error.path[0]).toBe('signUp')
    expect(error.message).toBe('password and confirmPassword are not equal')
    expect(error.extensions).toBeDefined()
    expect(error.extensions.status).toBe(409)
    expect(error.extensions.code).toBe('PASSWORD_NOT_EQUAL')
  })
}
