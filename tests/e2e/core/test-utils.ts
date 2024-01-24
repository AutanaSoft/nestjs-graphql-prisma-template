import { TokenService } from '@src/graphql/auth/services/token.service'
import { hashField } from '@src/graphql/shared/utils/hashField'
import { PrismaService } from '@src/core/prisma/prisma.service'

export const userTest = {
  userName: 'userTest',
  email: 'user-test@test-app.com',
  password: 'userTest',
}

export const adminTest = {
  userName: 'AdminTest',
  email: 'admin-test@test-app.com',
  password: 'adminTest',
}

export const getAdminToken = async (prisma: PrismaService, tokenService: TokenService) => {
  const admin = await prisma.userModel.findUnique({
    where: { email: adminTest.email },
  })

  if (!admin) {
    throw new Error('Admin not found')
  }

  const { token } = tokenService.generateToken(admin)

  return `Bearer ${token}`
}

export const createAdminUser = async (prisma: PrismaService) => {
  const exist = await prisma.userModel.findUnique({
    where: { email: adminTest.email },
  })

  if (!exist) {
    await prisma.userModel.create({
      data: {
        ...adminTest,
        roles: ['ADMIN'],
        password: hashField(adminTest.password),
      },
    })
  }

  return
}

export const deleteAllTestUsers = async (prisma: PrismaService) => {
  await prisma.userModel.deleteMany({
    where: {
      email: {
        endsWith: 'test-app.com',
      },
    },
  })
}
