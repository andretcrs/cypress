export const paginaLogin = {

  elements: {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
    error: '[data-test="error"]'
  },

  acessarLogin() {
    cy.visit('/')
  },

  logar(usuario, senha) {
    if (usuario) {
      cy.get(this.elements.username)
        .clear()
        .type(usuario)
    }

    if (senha) {
      cy.get(this.elements.password)
        .clear()
        .type(senha)
    }

    cy.get(this.elements.loginButton).click()
  }
}