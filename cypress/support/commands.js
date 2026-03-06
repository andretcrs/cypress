import { paginaLogin } from '@pages/paginaLogin'

Cypress.Commands.add('login', (user, password) => {
  
  paginaLogin.acessarLogin()
  paginaLogin.logar(user, password)
})