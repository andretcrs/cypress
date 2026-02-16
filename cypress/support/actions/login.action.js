import { loginPage } from "../pages/login.page"

export class LoginAction {

  acessarLogin() {
    cy.visit("/")
  }

  logar(usuario, senha) {

    // Só digita se a string não for vazia, null ou undefined
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
