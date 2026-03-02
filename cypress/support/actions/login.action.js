/* global cy  */
import { loginPage } from '../pages/login.page'

export class LoginAction {
  acessarLogin () {
    cy.visit('/')
  }

  logar (usuario, senha) {
    if (usuario) {
      cy.get(loginPage.username)
        .clear()
        .type(usuario)
    }

    if (senha) {
      cy.get(loginPage.password)
        .clear()
        .type(senha)
    }

    cy.get(loginPage.loginButton).click()
  }
}
