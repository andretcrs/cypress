import { loginAction } from '@actions/acaoLogin'
const login = new loginAction()

Cypress.Commands.add('login', (user, password) => {
  login.acessarLogin()
  login.logar(user, password)
})
