import { CreateUserTest } from './resolver/create-user.resolver'
import { MeTest } from './resolver/me.resolver'
import { UpdateUserTest } from './resolver/update-user.resolver'

export const UserModuleTest = () => {
  describe('createUser:', CreateUserTest)
  describe('me:', MeTest)
  describe('updateUser:', UpdateUserTest)
}
