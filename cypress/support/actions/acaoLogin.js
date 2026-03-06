import { paginaLogin } from '@pages/paginaLogin'

export class loginAction {
  acessarLogin () {
    cy.visit('/')
  }

  logar (usuario, senha) {
    if (usuario) {
      cy.get(paginaLogin.username)
        .clear()
        .type(usuario)
    }

    if (senha) {
      cy.get(paginaLogin.password)
        .clear()
        .type(senha)
    }

    cy.get(paginaLogin.loginButton).click()
  }
}
