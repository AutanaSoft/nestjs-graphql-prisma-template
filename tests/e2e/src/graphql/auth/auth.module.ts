import { SignInTests } from './resolvers/sign-in.resolver'
import { SignUpTests } from './resolvers/sign-up.resolver'

export const AuthModuleTest = () => {
  describe('SignUp:', SignUpTests)

  describe('SignIn:', SignInTests)
}
