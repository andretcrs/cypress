import { loginPage } from "../pages/login.page"

export class LoginAction {

  acessarLogin() {
    cy.visit("/")
  }

  logar(usuario, senha) {
    cy.get(loginPage.username).type(usuario)
    cy.get(loginPage.password).type(senha)
    cy.get(loginPage.loginButton).click()
  }

}
