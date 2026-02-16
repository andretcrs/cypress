import { LoginAction } from "./actions/login.action"
const login = new LoginAction()

Cypress.Commands.add('login', (user, password) => {
  login.acessarLogin()
  login.logar(user, password)
})